import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

type WhiteLabelConfig = {
  brandName: string;
  logoUrl?: string;
  primaryColor: string;
  accentColor: string;
  supportEmail?: string;
  customDomain?: string;
};

const DEFAULT_CONFIG: WhiteLabelConfig = {
  brandName: 'Raxie Zenith Estate',
  primaryColor: '#C9A96A',
  accentColor: '#1C1A17',
};

@Injectable()
export class WhiteLabelService {
  constructor(private prisma: PrismaService) {}

  private keyFor(agencyId?: string) {
    return agencyId ? `white_label:agency:${agencyId}` : 'white_label:global';
  }

  async getPublicConfig(agencyId?: string): Promise<WhiteLabelConfig> {
    const config = await this.getAdminConfig(agencyId);
    return {
      brandName: config.brandName,
      logoUrl: config.logoUrl,
      primaryColor: config.primaryColor,
      accentColor: config.accentColor,
      customDomain: config.customDomain,
    };
  }

  async getAdminConfig(agencyId?: string): Promise<WhiteLabelConfig> {
    const key = this.keyFor(agencyId);
    const setting = await this.prisma.platformSettings.findUnique({ where: { key } });
    if (!setting || !setting.value) {
      return DEFAULT_CONFIG;
    }

    const parsed = setting.value as WhiteLabelConfig;
    return {
      ...DEFAULT_CONFIG,
      ...parsed,
    };
  }

  async updateConfig(payload: Partial<WhiteLabelConfig>, agencyId?: string) {
    const key = this.keyFor(agencyId);
    const current = await this.getAdminConfig(agencyId);

    const merged: WhiteLabelConfig = {
      ...current,
      ...payload,
    };

    return this.prisma.platformSettings.upsert({
      where: { key },
      create: {
        key,
        value: merged as any,
        description: agencyId
          ? `White-label settings for agency ${agencyId}`
          : 'Global white-label settings',
      },
      update: {
        value: merged as any,
      },
    });
  }
}
