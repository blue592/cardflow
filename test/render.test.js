import test from 'node:test';
import assert from 'node:assert/strict';
import { parseMarkdown, renderSvg } from '../src/render.js';

test('splits markdown into cards', () => { assert.equal(parseMarkdown('# One\nA\n# Two\nB').length, 2); });
test('renders safe SVG with slide number', () => { const svg = renderSvg({ title: '<Hello>', body: 'Body' }, 0, 2); assert.match(svg, /1 \/ 2/); assert.doesNotMatch(svg, /<Hello>/); });

