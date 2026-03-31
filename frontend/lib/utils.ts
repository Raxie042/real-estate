const CURRENCY_TO_USD_RATE: Record<string, number> = {
  USD: 1,
  GBP: 1.27,
  EUR: 1.09,
  AED: 0.2723,
};

export function convertCurrency(amount: number, from: string = 'USD', to: string = 'USD'): number {
  const fromRate = CURRENCY_TO_USD_RATE[from] || 1;
  const toRate = CURRENCY_TO_USD_RATE[to] || 1;

  const amountInUsd = amount * fromRate;
  return amountInUsd / toRate;
}

export function formatPrice(price: number, currency: string = 'USD', locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatNumber(num: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(num);
}

export function formatDate(date: string | Date, locale: string = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatRelativeTime(date: string | Date, locale: string = 'en-US'): string {
  const now = new Date();
  const target = new Date(date);
  const diffMs = now.getTime() - target.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay > 30) {
    return formatDate(date, locale);
  } else if (diffDay > 0) {
    return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  } else if (diffHour > 0) {
    return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
  } else if (diffMin > 0) {
    return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
}

export function formatArea(squareFeet: number, unitSystem: 'imperial' | 'metric' = 'imperial', locale: string = 'en-US'): string {
  if (unitSystem === 'metric') {
    const squareMeters = squareFeet * 0.092903;
    return `${formatNumber(Math.round(squareMeters), locale)} m²`;
  }

  return `${formatNumber(squareFeet, locale)} sq ft`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}
