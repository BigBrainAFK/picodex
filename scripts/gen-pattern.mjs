/**
 * Writes the background pattern tile from src/lib/pattern.ts.
 *
 *   npm run pattern
 *
 * Run it after changing a glyph or the layout; pattern.test.ts fails until
 * the committed file matches the code again.
 */
import { writeFileSync } from 'node:fs';
import { buildPatternSvg } from '../src/lib/pattern.ts';

const OUT = 'src/assets/console-pattern.svg';
const svg = buildPatternSvg();
writeFileSync(OUT, svg);
console.log(`${OUT}: ${String(svg.length)} bytes`);
