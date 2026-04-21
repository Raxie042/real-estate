import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CRM_ACCESS_ROLES } from '../auth/constants/roles.constants';
import { CRMService } from '../../common/services/crm.service';
import { NotificationsService } from '../notifications/notifications.service';

@Controller('crm')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(...CRM_ACCESS_ROLES)
export class CrmController {
  constructor(
    private crmService: CRMService,
    private notificationsService: NotificationsService,
  ) {}

  /**
   * Get CRM metrics (lead counts and conversion rates)
   */
  @Get('metrics')
  async getCrmMetrics(@Request() req) {
    return this.crmService.getCRMMetrics(req.user.id);
  }

  @Get('dashboard')
  async getAdvancedDashboard(@Request() req) {
    return this.crmService.getAdvancedDashboard(req.user.id);
  }

  /**
   * Get lead score for a user
   */
  @Post('lead-score')
  async calculateLeadScore(
    @Body()
    data: {
      userId: string;
      interactions?: any[];
    },
  ) {
    const score = await this.crmService.calculateLeadScore(data.userId);
    const category = score.profiles.hotLead ? 'HOT' : score.profiles.warmLead ? 'WARM' : 'COLD';

    return {
      userId: data.userId,
      score: score.totalScore,
      scoreRange: { min: 0, max: 100 },
      category,
      breakdown: {
        engagement: score.engagementScore,
        buyingIntent: score.buyingIntentScore,
        responseTime: score.responseTimeScore,
      },
    };
  }

  /**
   * Get follow-up sequence for a lead
   */
  @Post('follow-up-sequence')
  async getFollowUpSequence(
    @Body()
    data: {
      leadScore: number;
    },
  ) {
    const scoreBandUserId = data.leadScore >= 70 ? 'hot-lead' : data.leadScore >= 40 ? 'warm-lead' : 'cold-lead';
    return this.crmService.getFollowUpSequence(scoreBandUserId);
  }

  /**
   * Generate follow-up tasks for a lead
   */
  @Post('generate-tasks')
  async generateFollowUpTasks(
    @Body()
    data: {
      leadId: string;
      daysOverdue: number;
    },
  @Request() req,
  ) {
    const tasks = await this.crmService.generateFollowUpTasks(req.user.id);
    return {
      leadId: data.leadId,
      tasksGenerated: tasks.length,
      status: 'CREATED',
      tasks,
    };
  }

  @Post('route-lead')
  async routeLead(
    @Body()
    data: {
      listingId: string;
      inquirerName: string;
      inquirerEmail: string;
      message: string;
      inquirerUserId?: string;
      slaHours?: number;
    },
  ) {
    return this.crmService.routeLeadFromInquiry(data);
  }

  /**
   * Get hot leads (score >= 70)
   */
  @Get('leads/hot')
  async getHotLeads(@Request() req) {
    const tasks = await this.crmService.generateFollowUpTasks(req.user.id);
    const hotLeads = tasks.filter((task) => task.priority === 'HIGH');
    return {
      category: 'HOT',
      count: hotLeads.length,
      description: 'Leads with high engagement - ready for immediate follow-up',
      leads: hotLeads,
    };
  }

  /**
   * Get warm leads (score 40-69)
   */
  @Get('leads/warm')
  async getWarmLeads(@Request() req) {
    const tasks = await this.crmService.generateFollowUpTasks(req.user.id);
    const warmLeads = tasks.filter((task) => task.priority === 'MEDIUM');
    return {
      category: 'WARM',
      count: warmLeads.length,
      description: 'Leads showing interest - require nurturing',
      leads: warmLeads,
    };
  }

  /**
   * Get cold leads (score < 40)
   */
  @Get('leads/cold')
  async getColdLeads() {
    return {
      category: 'COLD',
      count: 0,
      description: 'Leads with minimal engagement - long-term nurturing needed',
    };
  }

  @Get('sla-overdue')
  async getSlaOverdue(@Request() req) {
    const overdueTasks = await this.crmService.getOverdueLeadTasks(req.user.id);
    return {
      count: overdueTasks.length,
      tasks: overdueTasks,
    };
  }

  @Post('sla-reminders/run')
  async runSlaReminders(@Request() req) {
    const overdueTasks = await this.crmService.getOverdueLeadTasks(req.user.id);

    for (const task of overdueTasks) {
      if (!task.agentId) {
        continue;
      }

      await this.notificationsService.sendNotification(
        task.agentId,
        'SYSTEM',
        'Lead SLA Reminder',
        `Lead follow-up is overdue: ${task.title}`,
        {
          taskId: task.id,
          dueDate: task.dueDate,
          relatedUserId: task.relatedUserId,
        },
      );
    }

    return {
      remindersSent: overdueTasks.length,
      tasks: overdueTasks,
    };
  }

  /**
   * Get conversion rate analytics
   */
  @Get('conversion-rate')
  async getConversionRate() {
    return {
      conversionRate: '0%',
      transactionsCompleted: 0,
      totalLeads: 0,
    };
  }

  /**
   * Score breakdown explanation
   */
  @Get('score-breakdown')
  async getScoreBreakdown() {
    return {
      components: [
        {
          name: 'Engagement',
          maxPoints: 30,
          description: 'Recent interactions on properties',
        },
        {
          name: 'Buying Intent',
          maxPoints: 35,
          description: 'Views, saves, favorites, inquiries',
        },
        {
          name: 'Response Time',
          maxPoints: 20,
          description: 'Hours since last action (inverse relationship)',
        },
        {
          name: 'Transaction History',
          maxPoints: 15,
          description: 'Past completed purchases',
        },
      ],
      totalMaxScore: 100,
      categories: [
        { name: 'HOT', range: '70-100', action: 'Immediate follow-up' },
        { name: 'WARM', range: '40-69', action: 'Regular nurturing' },
        { name: 'COLD', range: '0-39', action: 'Long-term nurturing' },
      ],
    };
  }
}
