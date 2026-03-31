import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class RentalManagementService {
  constructor(private prisma: PrismaService) {}

  async createTenant(data: {
    propertyId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    moveInDate: string;
  }) {
    return this.prisma.tenant.create({
      data: {
        propertyId: data.propertyId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        moveInDate: new Date(data.moveInDate),
        status: 'ACTIVE',
      },
    });
  }

  async updateTenant(tenantId: string, data: any) {
    return this.prisma.tenant.update({
      where: { id: tenantId },
      data,
    });
  }

  async createLease(data: {
    tenantId: string;
    propertyId: string;
    startDate: string;
    endDate: string;
    monthlyRent: number;
    securityDeposit: number;
    terms?: string;
  }) {
    return this.prisma.lease.create({
      data: {
        tenantId: data.tenantId,
        propertyId: data.propertyId,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        monthlyRent: data.monthlyRent,
        securityDeposit: data.securityDeposit,
        terms: data.terms,
        status: 'ACTIVE',
      },
      include: {
        tenant: true,
        property: { select: { id: true, title: true } },
      },
    });
  }

  async recordRentPayment(data: {
    leaseId: string;
    tenantId: string;
    amount: number;
    dueDate: string;
    paidDate?: string;
  }) {
    return this.prisma.rentPayment.create({
      data: {
        leaseId: data.leaseId,
        tenantId: data.tenantId,
        amount: data.amount,
        dueDate: new Date(data.dueDate),
        paidDate: data.paidDate ? new Date(data.paidDate) : null,
        status: data.paidDate ? 'PAID' : 'PENDING',
      },
    });
  }

  async createMaintenanceRequest(data: {
    propertyId: string;
    tenantId?: string;
    title: string;
    description: string;
    priority?: string;
    category: string;
  }) {
    return this.prisma.maintenanceRequest.create({
      data: {
        propertyId: data.propertyId,
        tenantId: data.tenantId,
        title: data.title,
        description: data.description,
        priority: data.priority || 'NORMAL',
        category: data.category,
        status: 'OPEN',
      },
    });
  }

  async getTenantPaymentHistory(tenantId: string) {
    return this.prisma.rentPayment.findMany({
      where: { tenantId },
      include: { lease: { select: { id: true, property: { select: { title: true } } } } },
      orderBy: { dueDate: 'desc' },
    });
  }

  async getTenantDashboard(tenantId: string) {
    const [tenant, activeLeases, upcomingPayments, maintenance] = await Promise.all([
      this.prisma.tenant.findUnique({
        where: { id: tenantId },
      }),
      this.prisma.lease.findMany({
        where: { tenantId, status: 'ACTIVE' },
        include: { property: { select: { title: true, city: true, state: true } } },
      }),
      this.prisma.rentPayment.findMany({
        where: { tenantId, status: { in: ['PENDING', 'LATE'] } },
        orderBy: { dueDate: 'asc' },
      }),
      this.prisma.maintenanceRequest.findMany({
        where: { tenantId, status: { in: ['OPEN', 'IN_PROGRESS'] } },
      }),
    ]);

    return {
      tenant,
      activeLeases,
      upcomingPayments,
      maintenance,
      hasOverduePayments: upcomingPayments.some((p) => p.status === 'LATE'),
    };
  }

  async getOverdueRent(propertyId: string) {
    const today = new Date();
    return this.prisma.rentPayment.findMany({
      where: {
        lease: { propertyId },
        status: { in: ['LATE', 'PENDING'] },
        dueDate: { lt: today },
      },
      include: {
        tenant: { select: { id: true, firstName: true, lastName: true, email: true } },
        lease: { select: { monthlyRent: true } },
      },
      orderBy: { dueDate: 'asc' },
    });
  }

  async getPropertyDashboard(propertyId: string) {
    const [activeTenants, totalLeases, rentPayments, maintenance] = await Promise.all([
      this.prisma.tenant.count({
        where: { propertyId, status: 'ACTIVE' },
      }),
      this.prisma.lease.count({
        where: { propertyId },
      }),
      this.prisma.rentPayment.findMany({
        where: { lease: { propertyId } },
        select: { amount: true, status: true },
      }),
      this.prisma.maintenanceRequest.count({
        where: { propertyId, status: { in: ['OPEN', 'IN_PROGRESS'] } },
      }),
    ]);

    const totalRentCollected = rentPayments
      .filter((p) => p.status === 'PAID')
      .reduce((sum, p) => sum + parseFloat(p.amount.toString()), 0);

    return {
      propertyId,
      activeTenants,
      totalLeases,
      totalRentCollected,
      pendingMaintenance: maintenance,
      occupancyRate: totalLeases > 0 ? ((activeTenants / totalLeases) * 100).toFixed(1) : '0',
    };
  }

  async getRentalDashboard(propertyId: string) {
    const today = new Date();
    const [activeTenants, leases, overduePayments, maintenance] = await Promise.all([
      this.prisma.tenant.count({
        where: { propertyId, status: 'ACTIVE' },
      }),
      this.prisma.lease.findMany({
        where: { propertyId, status: 'ACTIVE' },
        select: { monthlyRent: true },
      }),
      this.prisma.rentPayment.count({
        where: {
          lease: { propertyId },
          status: 'LATE',
          dueDate: { lt: today },
        },
      }),
      this.prisma.maintenanceRequest.count({
        where: { propertyId, status: { in: ['OPEN', 'IN_PROGRESS'] } },
      }),
    ]);

    const totalMonthlyRent = leases.reduce(
      (sum, l) => sum + parseFloat(l.monthlyRent.toString()),
      0,
    );

    return {
      propertyId,
      activeTenants,
      totalMonthlyRent,
      overdueRentCount: overduePayments,
      maintenanceOpen: maintenance,
    };
  }

  async getPropertyLeases(propertyId: string) {
    return this.prisma.lease.findMany({
      where: { propertyId },
      include: {
        tenant: { select: { firstName: true, lastName: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getLease(leaseId: string) {
    return this.prisma.lease.findUnique({
      where: { id: leaseId },
      include: {
        tenant: true,
        property: { select: { title: true, city: true, state: true } },
        rentPayments: { orderBy: { dueDate: 'desc' } },
      },
    });
  }

  async getMaintenanceRequests(propertyId: string) {
    return this.prisma.maintenanceRequest.findMany({
      where: { propertyId },
      include: { tenant: { select: { firstName: true, lastName: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateMaintenanceRequest(requestId: string, data: any) {
    return this.prisma.maintenanceRequest.update({
      where: { id: requestId },
      data: {
        ...data,
        completedAt: data.status === 'COMPLETED' ? new Date() : null,
      },
    });
  }
}
