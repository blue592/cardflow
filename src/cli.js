#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseMarkdown, renderCards } from './render.js';

export async function main(argv = process.argv.slice(2)) {
  if (argv.includes('--help') || !argv[0]) return console.log('cardflow --input post.md --out cards [--accent #f97316] [--background #111827]');
  const input = argv[argv.indexOf('--input') + 1]; const out = argv[argv.indexOf('--out') + 1] || 'cards';
  if (!input) throw new Error('--input is required');
  const cards = parseMarkdown(await fs.readFile(input, 'utf8')); await renderCards(cards, path.resolve(out), { accent: argv.includes('--accent') ? argv[argv.indexOf('--accent') + 1] : undefined, background: argv.includes('--background') ? argv[argv.indexOf('--background') + 1] : undefined });
  console.log(`Created ${cards.length} Instagram cards in ${path.resolve(out)}`);
}
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) main().catch(error => { console.error(`Error: ${error.message}`); process.exitCode = 1; });

