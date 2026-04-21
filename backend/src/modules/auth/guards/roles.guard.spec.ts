import 'reflect-metadata';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { AnalyticsController } from '../../analytics/analytics.controller';
import { CrmController } from '../../crm/crm.controller';
import { AgenciesController } from '../../agencies/agencies.controller';
import { WhiteLabelController } from '../../white-label/white-label.controller';

function createExecutionContext(
  controllerClass: new (...args: any[]) => unknown,
  handlerName: string,
  role?: string,
): ExecutionContext {
  return {
    getClass: () => controllerClass,
    getHandler: () => controllerClass.prototype[handlerName],
    switchToHttp: () => ({
      getRequest: () => ({
        user: role ? { role } : undefined,
      }),
      getResponse: () => undefined,
      getNext: () => undefined,
    }),
  } as ExecutionContext;
}

describe('RolesGuard enterprise authorization', () => {
  let guard: RolesGuard;

  beforeEach(() => {
    guard = new RolesGuard(new Reflector());
  });

  describe('AnalyticsController.getPerformance', () => {
    it.each(['PLATFORM_ADMIN', 'ADMIN'])('allows %s', (role) => {
      const context = createExecutionContext(AnalyticsController, 'getPerformance', role);
      expect(guard.canActivate(context)).toBe(true);
    });

    it.each(['AGENCY_ADMIN', 'AGENT', 'BUYER', 'SELLER'])('denies %s', (role) => {
      const context = createExecutionContext(AnalyticsController, 'getPerformance', role);
      expect(guard.canActivate(context)).toBe(false);
    });
  });

  describe('CrmController class-level roles', () => {
    it.each(['PLATFORM_ADMIN', 'ADMIN', 'AGENCY_ADMIN', 'AGENT'])(
      'allows %s on dashboard',
      (role) => {
        const context = createExecutionContext(CrmController, 'getAdvancedDashboard', role);
        expect(guard.canActivate(context)).toBe(true);
      },
    );

    it.each(['BUYER', 'SELLER'])('denies %s on dashboard', (role) => {
      const context = createExecutionContext(CrmController, 'getAdvancedDashboard', role);
      expect(guard.canActivate(context)).toBe(false);
    });
  });

  describe('AgenciesController enterprise routes', () => {
    const methods = ['getTeamOverview', 'getAgentMetrics', 'assignListing', 'create', 'update'];

    it.each(methods)('allows agency admins on %s', (handlerName) => {
      const context = createExecutionContext(AgenciesController, handlerName, 'AGENCY_ADMIN');
      expect(guard.canActivate(context)).toBe(true);
    });

    it.each(methods)('allows platform admins on %s', (handlerName) => {
      const context = createExecutionContext(AgenciesController, handlerName, 'PLATFORM_ADMIN');
      expect(guard.canActivate(context)).toBe(true);
    });

    it.each(methods)('denies buyers on %s', (handlerName) => {
      const context = createExecutionContext(AgenciesController, handlerName, 'BUYER');
      expect(guard.canActivate(context)).toBe(false);
    });
  });

  describe('WhiteLabelController admin routes', () => {
    const methods = ['getAdmin', 'updateAdmin'];

    it.each(['AGENCY_ADMIN', 'PLATFORM_ADMIN', 'ADMIN'])('allows %s', (role) => {
      for (const handlerName of methods) {
        const context = createExecutionContext(WhiteLabelController, handlerName, role);
        expect(guard.canActivate(context)).toBe(true);
      }
    });

    it.each(['AGENT', 'BUYER', 'SELLER'])('denies %s', (role) => {
      for (const handlerName of methods) {
        const context = createExecutionContext(WhiteLabelController, handlerName, role);
        expect(guard.canActivate(context)).toBe(false);
      }
    });
  });

  it('allows handlers with no role metadata', () => {
    const context = createExecutionContext(AnalyticsController, 'getDashboard', 'BUYER');
    expect(guard.canActivate(context)).toBe(true);
  });

  it('denies protected handlers when request user is missing', () => {
    const context = createExecutionContext(WhiteLabelController, 'getAdmin');
    expect(guard.canActivate(context)).toBe(false);
  });
});
