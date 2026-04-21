export const PLATFORM_ADMIN_ROLES = ['PLATFORM_ADMIN', 'ADMIN'] as const;
export const AGENCY_ADMIN_ROLES = ['AGENCY_ADMIN', ...PLATFORM_ADMIN_ROLES] as const;
export const CRM_ACCESS_ROLES = ['AGENT', ...AGENCY_ADMIN_ROLES] as const;
