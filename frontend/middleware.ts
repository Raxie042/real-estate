import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const AUTH_COOKIE = 'raxie-auth-token';
const SUPPORTED_LANGUAGES = ['en', 'fr', 'de', 'ar'] as const;
const PROTECTED_PATHS = [
  '/valuation',
  '/offers',
  '/saved-searches',
  '/profile',
  '/my-listings',
  '/list-property',
  '/comparison',
  '/analytics',
  '/edit-listing',
];

function getLanguageFromCookie(request: NextRequest): string {
  const raw = request.cookies.get('raxie-preferences')?.value;
  if (!raw) return 'en';

  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    const language = parsed?.language;
    if (SUPPORTED_LANGUAGES.includes(language)) {
      return language;
    }
  } catch {
    return 'en';
  }

  return 'en';
}

function readPreferencesCookie(request: NextRequest): Record<string, unknown> {
  const raw = request.cookies.get('raxie-preferences')?.value;
  if (!raw) return {};

  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    if (parsed && typeof parsed === 'object') {
      return parsed as Record<string, unknown>;
    }
  } catch {
    return {};
  }

  return {};
}

function hasLocalePrefix(pathname: string): boolean {
  return SUPPORTED_LANGUAGES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
}

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATHS.some(
    (protectedPath) => pathname === protectedPath || pathname.startsWith(`${protectedPath}/`)
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (!hasLocalePrefix(pathname)) {
    const locale = getLanguageFromCookie(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }

  const locale = pathname.split('/')[1];
  const strippedPath = pathname.replace(`/${locale}`, '') || '/';

  const authToken = request.cookies.get(AUTH_COOKIE)?.value;
  if (isProtectedPath(strippedPath) && !authToken) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = `/${locale}/login`;
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = strippedPath;
  const response = NextResponse.rewrite(rewriteUrl);

  if (SUPPORTED_LANGUAGES.includes(locale as (typeof SUPPORTED_LANGUAGES)[number])) {
    const existing = readPreferencesCookie(request);
    const nextPreferences = {
      ...existing,
      language: locale,
    };

    response.cookies.set('raxie-preferences', encodeURIComponent(JSON.stringify(nextPreferences)), {
      path: '/',
      maxAge: 31536000,
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
