const INVALID_TOKEN_HINTS = [
  'your_mapbox',
  'your-token',
  'placeholder',
  'changeme',
  'pk_test_token_example',
  'test_token_example',
];

export function getValidMapboxPublicToken(rawToken?: string): string | null {
  const token = (rawToken || '').trim();

  if (!token) {
    return null;
  }

  const lowered = token.toLowerCase();
  if (INVALID_TOKEN_HINTS.some((hint) => lowered.includes(hint))) {
    return null;
  }

  if (!token.startsWith('pk.')) {
    return null;
  }

  if (token.length < 20) {
    return null;
  }

  return token;
}
