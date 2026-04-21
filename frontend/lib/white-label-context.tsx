'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '@/lib/api';

type WhiteLabelConfig = {
  brandName: string;
  logoUrl?: string;
  primaryColor: string;
  accentColor: string;
  customDomain?: string;
};

const DEFAULT_CONFIG: WhiteLabelConfig = {
  brandName: 'Raxie Zenith Estate',
  primaryColor: '#C9A96A',
  accentColor: '#1C1A17',
};

const WhiteLabelContext = createContext<{
  config: WhiteLabelConfig;
  loading: boolean;
  refresh: () => Promise<void>;
} | null>(null);

function applyTheme(config: WhiteLabelConfig) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--brand-primary', config.primaryColor || DEFAULT_CONFIG.primaryColor);
  root.style.setProperty('--brand-accent', config.accentColor || DEFAULT_CONFIG.accentColor);
}

export function WhiteLabelProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<WhiteLabelConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const response = await api.whiteLabel.getPublic();
      const nextConfig = {
        ...DEFAULT_CONFIG,
        ...(response.data || {}),
      };
      setConfig(nextConfig);
      applyTheme(nextConfig);
      if (typeof document !== 'undefined') {
        document.title = nextConfig.brandName;
      }
    } catch {
      setConfig(DEFAULT_CONFIG);
      applyTheme(DEFAULT_CONFIG);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const value = useMemo(() => ({ config, loading, refresh }), [config, loading]);

  return <WhiteLabelContext.Provider value={value}>{children}</WhiteLabelContext.Provider>;
}

export function useWhiteLabel() {
  const ctx = useContext(WhiteLabelContext);
  if (!ctx) {
    throw new Error('useWhiteLabel must be used inside WhiteLabelProvider');
  }
  return ctx;
}
