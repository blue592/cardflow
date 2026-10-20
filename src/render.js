import fs from 'node:fs/promises';
import path from 'node:path';

export function parseMarkdown(markdown) {
  return markdown.split(/\n(?=# )/).map(block => {
    const lines = block.trim().split('\n'); const title = (lines.shift() || '').replace(/^#\s*/, '').trim();
    return { title: title || 'Cardflow', body: lines.join('\n').replace(/^[-*]\s/gm, '• ') };
  }).filter(card => card.title || card.body);
}

function esc(value) { return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;'); }
export function renderSvg(card, index, total, options = {}) {
  const bg = options.background || '#111827'; const accent = options.accent || '#f97316'; const text = options.text || '#f9fafb';
  const body = String(card.body || '').split('\n').slice(0, 8).map((line, i) => `<text x="100" y="${430 + i * 58}" fill="${text}" font-size="30" font-family="Arial, sans-serif">${esc(line.slice(0, 48))}</text>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080"><rect width="1080" height="1080" fill="${bg}"/><rect x="100" y="120" width="110" height="12" rx="6" fill="${accent}"/><text x="100" y="270" fill="${text}" font-size="64" font-weight="700" font-family="Arial, sans-serif">${esc(card.title)}</text>${body}<text x="100" y="980" fill="${accent}" font-size="24" font-family="Arial, sans-serif">${index + 1} / ${total}</text></svg>`;
}
export async function renderCards(cards, outputDir, options = {}) {
  await fs.mkdir(outputDir, { recursive: true });
  await Promise.all(cards.map((card, index) => fs.writeFile(path.join(outputDir, `${String(index + 1).padStart(2, '0')}.svg`), renderSvg(card, index, cards.length, options))));
}

