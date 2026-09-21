import { readdir, readFile, rename, stat, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

// macOS can retain decomposed Korean filenames from src/pages. URLs and the
// sitemap use NFC, so normalize the generated asset names before uploading.
const output = fileURLToPath(new URL('../dist/', import.meta.url));
const renamed = [];
const textExtensions = new Set(['.html', '.xml', '.css', '.js', '.json', '.txt', '.yml', '.svg']);

async function normalizeNames(directory) {
  const entries = await readdir(directory);
  const normalizedEntries = entries.map((entry) => entry.normalize('NFC'));
  if (new Set(normalizedEntries).size !== entries.length) {
    throw new Error(`Filename collision in ${directory}`);
  }
  for (const entry of entries) {
    const original = join(directory, entry);
    if ((await stat(original)).isDirectory()) await normalizeNames(original);

    const normalized = entry.normalize('NFC');
    if (normalized === entry) continue;

    const destination = join(directory, normalized);
    await rename(original, destination);
    renamed.push([entry, normalized]);
  }
}

async function normalizeReferences(directory) {
  for (const entry of await readdir(directory)) {
    const file = join(directory, entry);
    if ((await stat(file)).isDirectory()) {
      await normalizeReferences(file);
      continue;
    }
    if (!textExtensions.has(extname(entry))) continue;

    const original = await readFile(file, 'utf8');
    let updated = original;
    for (const [before, after] of renamed) {
      updated = updated.replaceAll(before, after);
      updated = updated.replaceAll(encodeURIComponent(before), encodeURIComponent(after));
    }
    if (updated !== original) await writeFile(file, updated);
  }
}

await normalizeNames(output);
await normalizeReferences(output);
console.log(`Normalized ${renamed.length} generated filenames to NFC.`);
