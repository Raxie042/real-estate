import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RentalManagementService } from './rental.service';

@Controller('rental')
@UseGuards(JwtAuthGuard)
export class RentalController {
  constructor(private rentalService: RentalManagementService) {}

  /**
   * Create a new tenant
   */
  @Post('tenant')
  async createTenant(
    @Body()
    data: {
      propertyId: string;
      firstName: string;
      lastName: string;
      email: string;
      phone?: string;
      moveInDate: Date;
    },
  ) {
    return this.rentalService.createTenant({
      propertyId: data.propertyId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      moveInDate: String(data.moveInDate),
    });
  }

  /**
   * Update tenant information
   */
  @Put('tenant/:tenantId')
  async updateTenant(@Param('tenantId') tenantId: string, @Body() data: any) {
    return this.rentalService.updateTenant(tenantId, data);
  }

  /**
   * Create a lease agreement
   */
  @Post('lease')
  async createLease(
    @Body()
    data: {
      tenantId: string;
      propertyId: string;
      startDate: Date;
      endDate: Date;
      monthlyRent: number;
      securityDeposit: number;
      terms?: string;
    },
  ) {
    return this.rentalService.createLease({
      tenantId: data.tenantId,
      propertyId: data.propertyId,
      startDate: String(data.startDate),
      endDate: String(data.endDate),
      monthlyRent: data.monthlyRent,
      securityDeposit: data.securityDeposit,
      terms: data.terms,
    });
  }

  /**
   * Record a rent payment
   */
  @Post('rent-payment')
  async recordRentPayment(
    @Body()
    data: {
      leaseId: string;
      tenantId: string;
      amount: number;
      paidDate: Date;
      notes?: string;
    },
  ) {
    return this.rentalService.recordRentPayment({
      leaseId: data.leaseId,
      tenantId: data.tenantId,
      amount: data.amount,
      dueDate: String(data.paidDate),
      paidDate: String(data.paidDate),
    });
  }

  /**
   * Get tenant payment history
   */
  @Get('tenant/:tenantId/payment-history')
  async getTenantPaymentHistory(@Param('tenantId') tenantId: string) {
    return this.rentalService.getTenantPaymentHistory(tenantId);
  }

  /**
   * Get overdue rent for a property
   */
  @Get('property/:propertyId/overdue-rent')
  async getOverdueRent(@Param('propertyId') propertyId: string) {
    return this.rentalService.getOverdueRent(propertyId);
  }

  /**
   * Get tenant dashboard (tenant view)
   */
  @Get('tenant/:tenantId/dashboard')
  async getTenantDashboard(@Param('tenantId') tenantId: string) {
    return this.rentalService.getTenantDashboard(tenantId);
  }

  /**
   * Get property dashboard (landlord view)
   */
  @Get('property/:propertyId/dashboard')
  async getPropertyDashboard(@Param('propertyId') propertyId: string) {
    return this.rentalService.getPropertyDashboard(propertyId);
  }

  /**
   * Create maintenance request
   */
  @Post('maintenance-request')
  async createMaintenanceRequest(
    @Body()
    data: {
      propertyId: string;
      tenantId?: string;
      title: string;
      description: string;
      priority?: string;
      category: string;
    },
  ) {
    return this.rentalService.createMaintenanceRequest(data);
  }

  /**
   * Get maintenance requests for property
   */
  @Get('property/:propertyId/maintenance-requests')
  async getMaintenanceRequests(@Param('propertyId') propertyId: string) {
    return this.rentalService.getMaintenanceRequests(propertyId);
  }

  /**
   * Update maintenance request status
   */
  @Put('maintenance-request/:requestId')
  async updateMaintenanceRequest(
    @Param('requestId') requestId: string,
    @Body() data: { status: string },
  ) {
    return this.rentalService.updateMaintenanceRequest(requestId, data);
  }

  /**
   * Get lease by ID
   */
  @Get('lease/:leaseId')
  async getLeaseById(@Param('leaseId') leaseId: string) {
    return this.rentalService.getLease(leaseId);
  }

  /**
   * Get all leases for property
   */
  @Get('property/:propertyId/leases')
  async getPropertyLeases(@Param('propertyId') propertyId: string) {
    return this.rentalService.getPropertyLeases(propertyId);
  }
}
