import { describe, expect, it } from 'vitest';
import committedSvg from '../assets/console-pattern.svg?raw';
import {
  buildPatternSvg,
  CELL_STEP,
  GLYPH_SIZE,
  GLYPHS,
  layoutTile,
  TILE_SIZE,
  touchingCells,
} from './pattern';

const placements = layoutTile();

/** Center of a cell before jitter: odd rows sit half a cell to the right. */
function center(row: number, column: number) {
  return { x: column * CELL_STEP + (row % 2) * (CELL_STEP / 2), y: row * CELL_STEP };
}

/** Distance between two cells on the repeating tile, the shorter way round on each axis. */
function wrappedDistance(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = Math.abs(a.x - b.x);
  const dy = Math.abs(a.y - b.y);
  return Math.hypot(Math.min(dx, TILE_SIZE - dx), Math.min(dy, TILE_SIZE - dy));
}

describe('layoutTile', () => {
  it('fills every cell once', () => {
    const cells = new Set(placements.map(({ row, column }) => `${String(row)},${String(column)}`));
    expect(placements).toHaveLength(100);
    expect(cells.size).toBe(100);
  });

  it('uses every glyph at least three times', () => {
    const counts = new Map<string, number>();
    for (const { glyph } of placements) counts.set(glyph, (counts.get(glyph) ?? 0) + 1);
    for (const name of Object.keys(GLYPHS)) {
      expect(counts.get(name) ?? 0, name).toBeGreaterThanOrEqual(3);
    }
  });

  // measured by distance, not with touchingCells, so a mistake there cannot hide here
  it('keeps each glyph away from copies of itself, across the edges of the tile too', () => {
    for (const a of placements) {
      for (const b of placements) {
        if (a === b) continue;
        const near =
          wrappedDistance(center(a.row, a.column), center(b.row, b.column)) < CELL_STEP * 1.3;
        if (near)
          expect(a.glyph, `${a.glyph} at ${String(a.row)},${String(a.column)}`).not.toBe(b.glyph);
      }
    }
  });

  it('keeps glyphs inside the tile vertically, so only the right edge needs a second copy', () => {
    for (const { y } of placements) {
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y + GLYPH_SIZE).toBeLessThanOrEqual(TILE_SIZE);
    }
  });

  it('comes out the same on every run', () => {
    expect(layoutTile()).toEqual(placements);
  });
});

describe('touchingCells', () => {
  it('names six different cells, all of them within one step and a bit', () => {
    for (const { row, column } of placements) {
      const cells = touchingCells(row, column);
      expect(new Set(cells.map(([r, c]) => `${String(r)},${String(c)}`)).size).toBe(6);
      for (const [r, c] of cells) {
        expect(wrappedDistance(center(row, column), center(r, c))).toBeLessThan(CELL_STEP * 1.3);
      }
    }
  });
});

describe('buildPatternSvg', () => {
  const svg = buildPatternSvg();

  it('defines every glyph once and only uses glyphs it defines', () => {
    for (const name of Object.keys(GLYPHS)) {
      expect(svg.match(new RegExp(`<symbol id="${name}"`, 'g')), name).toHaveLength(1);
    }
    for (const [, name] of svg.matchAll(/<use href="#([a-z]+)"/g)) {
      expect(Object.keys(GLYPHS)).toContain(name);
    }
  });

  it('draws a glyph that crosses the right edge again at the left', () => {
    const crossing = placements.filter(({ x }) => x + GLYPH_SIZE > TILE_SIZE).length;
    expect(svg.match(/<use /g)).toHaveLength(placements.length + crossing);
  });

  it('matches the committed src/assets/console-pattern.svg (run npm run pattern after a change)', () => {
    expect(committedSvg).toBe(svg);
  });
});
