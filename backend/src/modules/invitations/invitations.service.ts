import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { EmailService } from '../../common/services/email.service';
import { CreateInvitationApplicationDto } from './dto/create-invitation-application.dto';
import { InvitationStatusDto } from './dto/update-invitation-status.dto';

@Injectable()
export class InvitationsService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  private get invitationApplication() {
    return (this.prisma as any).invitationApplication;
  }

  async createApplication(data: CreateInvitationApplicationDto) {
    const created = await this.invitationApplication.create({
      data,
      select: {
        id: true,
        status: true,
        createdAt: true,
      },
    });

    try {
      await this.emailService.sendInvitationApplicationReceived({
        recipientEmail: data.email,
        recipientName: `${data.firstName} ${data.lastName}`.trim(),
      });

      await this.invitationApplication.update({
        where: { id: created.id },
        data: {
          lastEmailSentAt: new Date(),
          lastEmailType: 'APPLICATION_RECEIVED',
        },
      });
    } catch (error) {
      console.error('Failed to send applicant invitation confirmation email:', error);
    }

    const adminEmail =
      process.env.ADMIN_EMAIL || process.env.INVITATIONS_REVIEW_EMAIL || process.env.SMTP_USER;
    if (adminEmail) {
      try {
        await this.emailService.sendInvitationApplicationAdminAlert({
          recipientEmail: adminEmail,
          applicantName: `${data.firstName} ${data.lastName}`.trim(),
          applicantEmail: data.email,
          phone: data.phone,
          company: data.company,
          market: data.market,
          portfolioSize: data.portfolioSize,
          message: data.message,
        });
      } catch (error) {
        console.error('Failed to send admin invitation alert email:', error);
      }
    }

    return created;
  }

  async listApplications(params?: {
    status?: InvitationStatusDto;
    page?: number;
    limit?: number;
  }) {
    const page = Math.max(1, Number(params?.page || 1));
    const limit = Math.min(100, Math.max(1, Number(params?.limit || 20)));

    const where = params?.status
      ? { status: params.status }
      : {};

    const [items, total] = await Promise.all([
      this.invitationApplication.findMany({
        where,
        include: {
          reviewedBy: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.invitationApplication.count({ where }),
    ]);

    return {
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateApplicationStatus(
    id: string,
    status: InvitationStatusDto,
    reviewedById: string,
    adminNotes?: string,
  ) {
    const updated = await this.invitationApplication.update({
      where: { id },
      data: {
        status,
        adminNotes,
        reviewedById,
        reviewedAt: new Date(),
      },
      include: {
        reviewedBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (status === InvitationStatusDto.APPROVED || status === InvitationStatusDto.REJECTED) {
      try {
        await this.emailService.sendInvitationDecision({
          recipientEmail: updated.email,
          recipientName: `${updated.firstName} ${updated.lastName}`.trim(),
          status,
          adminNotes,
        });

        await this.invitationApplication.update({
          where: { id: updated.id },
          data: {
            lastEmailSentAt: new Date(),
            lastEmailType:
              status === InvitationStatusDto.APPROVED ? 'DECISION_APPROVED' : 'DECISION_REJECTED',
          },
        });
      } catch (error) {
        console.error('Failed to send invitation decision email:', error);
      }
    }

    return updated;
  }
}
