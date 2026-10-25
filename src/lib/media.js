import fs from 'node:fs';
import path from 'node:path';

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

export function listImages(relDir) {
  const dir = path.join(process.cwd(), 'public', 'images', ...relDir.split('/'));
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && IMAGE_EXT.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, 'en'))
    .map((name) => `/images/${relDir}/${encodeURIComponent(name)}`);
}

export function firstImage(relDir) {
  return listImages(relDir)[0];
}
