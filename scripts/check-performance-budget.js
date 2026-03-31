const fs = require('fs');
const path = require('path');

const inputPath = process.argv[2] || 'frontend-build.log';
const resolved = path.resolve(process.cwd(), inputPath);

if (!fs.existsSync(resolved)) {
  console.error(`❌ Build log not found: ${resolved}`);
  process.exit(1);
}

const raw = fs.readFileSync(resolved);
const nullByteCount = raw.subarray(0, Math.min(raw.length, 4000)).filter((b) => b === 0).length;
const encoding = nullByteCount > 200 ? 'utf16le' : 'utf8';
const text = raw.toString(encoding);
const lines = text.split(/\r?\n/);

const budgets = {
  '/': 170 * 1024,
  '/search': 170 * 1024,
  '/properties': 170 * 1024,
  '/properties/[id]': 170 * 1024,
  '/valuation': 145 * 1024,
};

function parseSizeToBytes(size) {
  const match = String(size).trim().match(/^(\d+(?:\.\d+)?)\s*(B|kB|MB)$/i);
  if (!match) return null;
  const value = Number(match[1]);
  const unit = match[2].toLowerCase();
  if (unit === 'b') return value;
  if (unit === 'kb') return value * 1024;
  if (unit === 'mb') return value * 1024 * 1024;
  return null;
}

function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} kB`;
  return `${bytes.toFixed(0)} B`;
}

const found = {};

for (const rawLine of lines) {
  if (!rawLine.includes('/')) continue;

  const line = rawLine
    .replace(/[^\x20-\x7E]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const match = line.match(
    /(\/(?:[\w\-./\[\]]+)?)\s+(\d+(?:\.\d+)?\s*(?:B|kB|MB))\s+(\d+(?:\.\d+)?\s*(?:B|kB|MB))$/i,
  );
  if (!match) continue;

  const route = match[1];
  const firstLoadRaw = match[3];
  const bytes = parseSizeToBytes(firstLoadRaw);
  if (bytes == null) continue;

  if (route in budgets) {
    found[route] = { bytes, raw: firstLoadRaw, line: rawLine };
  }
}

let hasFailure = false;

for (const [route, budget] of Object.entries(budgets)) {
  if (!found[route]) {
    console.error(`❌ Route not found in build output: ${route}`);
    hasFailure = true;
    continue;
  }

  const actual = found[route].bytes;
  if (actual > budget) {
    console.error(
      `❌ Budget exceeded for ${route}: ${formatBytes(actual)} > ${formatBytes(budget)}`,
    );
    hasFailure = true;
  } else {
    console.log(`✅ ${route}: ${formatBytes(actual)} (budget ${formatBytes(budget)})`);
  }
}

if (hasFailure) {
  process.exit(1);
}

console.log('✅ Route performance budget check passed.');
