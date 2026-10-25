/**
 * The background pattern: console and game glyphs scattered over a tile that
 * repeats across the page. The glyphs are drawn here, without logos.
 *
 * buildPatternSvg() returns the tile. `npm run pattern` writes it to
 * src/assets/console-pattern.svg, which index.css paints behind the app
 * through a mask, and pattern.test.ts fails when that file and this code
 * disagree.
 */

/**
 * A glyph on a 24-unit grid. A line glyph is SVG markup drawn with the tile's
 * stroke; a pixel glyph lists rows of filled cells ('X'), like a sprite.
 */
export type Glyph = { line: string } | { pixels: string[]; cell: number; x: number; y: number };

export const GLYPHS: Record<string, Glyph> = {
  // handhelds and consoles
  ds: {
    line: '<rect x="5" y="2.5" width="14" height="8.5" rx="1.5"/><rect x="7.5" y="4.5" width="9" height="5" rx=".5"/><rect x="4" y="13" width="16" height="8.5" rx="2"/><rect x="8.5" y="14.75" width="7" height="5" rx=".5"/><path d="M5.6 17.25h1.6M6.4 16.45v1.6"/><circle cx="18" cy="17.25" r=".6"/>',
  },
  gameboy: {
    line: '<path d="M7.5 2h9A1.5 1.5 0 0 1 18 3.5V17a5 5 0 0 1-5 5H7.5A1.5 1.5 0 0 1 6 20.5v-17A1.5 1.5 0 0 1 7.5 2z"/><rect x="8" y="4.25" width="8" height="6.5" rx=".5"/><path d="M8.5 15.5h3M10 14v3"/><circle cx="14.4" cy="16.2" r=".8"/><circle cx="16" cy="14.6" r=".8"/>',
  },
  gba: {
    line: '<rect x="2.5" y="7" width="19" height="10" rx="4"/><rect x="8" y="8.75" width="8" height="6.5" rx=".5"/><path d="M4.6 12h2.6M5.9 10.7v2.6"/><circle cx="18" cy="11.3" r=".7"/><circle cx="19.3" cy="12.7" r=".7"/>',
  },
  gbasp: {
    line: '<rect x="5" y="2.5" width="14" height="9" rx="1.5"/><rect x="7.5" y="4.5" width="9" height="5.5" rx=".5"/><rect x="5" y="12.5" width="14" height="9" rx="1.5"/><path d="M7.5 17h3M9 15.5v3"/><circle cx="15" cy="17.75" r=".7"/><circle cx="16.5" cy="16.25" r=".7"/>',
  },
  gamegear: {
    line: '<rect x="2" y="6.5" width="20" height="11" rx="3.5"/><rect x="7" y="8.25" width="10" height="7.5" rx=".75"/><circle cx="4.6" cy="12" r="1.2"/><circle cx="19.4" cy="11.2" r=".6"/><circle cx="19.4" cy="13" r=".6"/>',
  },
  switch: {
    line: '<path d="M7.25 5.5h-1.5A3.75 3.75 0 0 0 2 9.25v5.5a3.75 3.75 0 0 0 3.75 3.75h1.5zM16.75 5.5h1.5A3.75 3.75 0 0 1 22 9.25v5.5a3.75 3.75 0 0 1-3.75 3.75h-1.5z"/><rect x="7.25" y="5.5" width="9.5" height="13" rx=".5"/><circle cx="4.75" cy="9.5" r="1.1"/><circle cx="19.25" cy="14.5" r="1.1"/>',
  },
  tamagotchi: {
    line: '<path d="M12 2.5c4.4 0 7.5 5 7.5 10.25S16.1 21.5 12 21.5s-7.5-3.5-7.5-8.75S7.6 2.5 12 2.5z"/><rect x="8.5" y="7.75" width="7" height="6" rx=".75"/><circle cx="9.6" cy="17.25" r=".7"/><circle cx="12" cy="18" r=".7"/><circle cx="14.4" cy="17.25" r=".7"/>',
  },
  cabinet: {
    line: '<path d="M7 2.5h10V6l-1 1.25v5.25l2 2V21.5H6v-7l2-2V7.25L7 6z"/><path d="M7 6h10"/><rect x="9" y="8" width="6" height="4.5" rx=".4"/><path d="M6 14.5h12M9.5 16.5v1.25"/><circle cx="9.5" cy="16.25" r=".75"/><circle cx="13.5" cy="17" r=".55"/><circle cx="15" cy="17" r=".55"/>',
  },
  joystick: {
    line: '<path d="M4.5 20.5h15l-1.25-4.5H5.75z"/><path d="M12 16V9"/><circle cx="12" cy="6.5" r="2.75"/><circle cx="16.25" cy="18.25" r=".75"/>',
  },
  // controllers
  nespad: {
    line: '<rect x="2" y="7" width="20" height="10" rx="1.5"/><path d="M4.75 12h3.5M6.5 10.25v3.5M10.25 13.25h1.5M12.75 13.25h1.5"/><circle cx="16.4" cy="12.5" r="1.15"/><circle cx="19.2" cy="12.5" r="1.15"/>',
  },
  snespad: {
    line: '<path d="M7 8h10a4 4 0 0 1 0 8 4 4 0 0 1-3-1.35h-4A4 4 0 0 1 7 16a4 4 0 0 1 0-8z"/><path d="M5.5 12h3M7 10.5v3"/><circle cx="16.5" cy="11.2" r=".7"/><circle cx="18" cy="12.7" r=".7"/>',
  },
  gamepad: {
    line: '<path d="M7.5 6.5h9c2.2 0 3.7 1.5 4.2 3.7l1.1 5.4c.4 1.9-1 3.4-2.7 3.4-1.1 0-2-.6-2.6-1.6l-1.1-1.9H8.6l-1.1 1.9c-.6 1-1.5 1.6-2.6 1.6-1.7 0-3.1-1.5-2.7-3.4l1.1-5.4c.5-2.2 2-3.7 4.2-3.7z"/><path d="M6.25 11h3M7.75 9.5v3"/><circle cx="15.6" cy="11.75" r=".75"/><circle cx="17.25" cy="10.1" r=".75"/>',
  },
  facebuttons: {
    line: '<path d="M12 3.4l2 3.4h-4z"/><circle cx="18.1" cy="12" r="2"/><path d="M10.6 16.6l2.8 2.8M13.4 16.6l-2.8 2.8"/><rect x="3.9" y="10" width="4" height="4" rx=".3"/>',
  },
  dpad: { line: '<path d="M9.5 4h5v5.5H20v5h-5.5V20h-5v-5.5H4v-5h5.5z"/>' },
  // media
  dscard: {
    line: '<path d="M6.5 5h8L18 8.5V19a1 1 0 0 1-1 1H6.5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/><rect x="7.75" y="9" width="7.5" height="6.5" rx=".5"/>',
  },
  gbcart: {
    line: '<path d="M6.5 3h11a1 1 0 0 1 1 1v14.5L16 21H6.5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M8 5.25h8"/><rect x="8" y="8" width="8" height="8" rx=".5"/>',
  },
  sdcard: {
    line: '<path d="M9.5 3H17a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V6.5z"/><path d="M10 4.5v2.5M12.25 4.5v2.5M14.5 4.5v2.5M16.5 4.5v2.5"/>',
  },
  // game motifs
  ghost: {
    line: '<path d="M6 20V10.5a6 6 0 0 1 12 0V20l-2-1.6-2 1.6-2-1.6-2 1.6-2-1.6z"/><circle cx="10" cy="10.75" r="1.1"/><circle cx="14" cy="10.75" r="1.1"/>',
  },
  invader: {
    pixels: [
      '..X.....X..',
      '...X...X...',
      '..XXXXXXX..',
      '.XX.XXX.XX.',
      'XXXXXXXXXXX',
      'X.XXXXXXX.X',
      'X.X.....X.X',
      '...XX.XX...',
    ],
    cell: 2,
    x: 1,
    y: 4,
  },
  heart: {
    pixels: ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'],
    cell: 2.5,
    x: 3.25,
    y: 4.5,
  },
  mushroom: {
    line: '<path d="M3.75 13.5a8.25 8.25 0 0 1 16.5 0z"/><circle cx="12" cy="8.75" r="1.75"/><circle cx="7.25" cy="11.25" r="1"/><circle cx="16.75" cy="11.25" r="1"/><path d="M8.5 13.5v4.75a1.5 1.5 0 0 0 1.5 1.5h4a1.5 1.5 0 0 0 1.5-1.5V13.5M10.75 15.5v1M13.25 15.5v1"/>',
  },
  qblock: {
    line: '<rect x="4" y="4" width="16" height="16" rx="1.5"/><path d="M9.6 9.6a2.4 2.4 0 1 1 3.6 2.1c-.75.45-1.2.9-1.2 1.65v.6M12 16.6h.01M6.6 6.6h.01M17.4 6.6h.01M6.6 17.4h.01M17.4 17.4h.01"/>',
  },
  coin: { line: '<ellipse cx="12" cy="12" rx="5.75" ry="8.5"/><path d="M12 7.5v9"/>' },
  trophy: {
    line: '<path d="M7.5 3.5h9v5.5a4.5 4.5 0 0 1-9 0z"/><path d="M7.5 5.5H5.25a2.25 2.25 0 0 0 0 4.5h2.6M16.5 5.5h2.25a2.25 2.25 0 0 1 0 4.5h-2.6M12 13.5v3.5"/><path d="M8.5 20.5h7M9.75 17h4.5v3.5h-4.5z"/>',
  },
  tetromino: {
    line: '<rect x="4.5" y="6.5" width="5" height="5" rx=".4"/><rect x="9.5" y="6.5" width="5" height="5" rx=".4"/><rect x="14.5" y="6.5" width="5" height="5" rx=".4"/><rect x="9.5" y="11.5" width="5" height="5" rx=".4"/>',
  },
  bomb: {
    line: '<circle cx="10.5" cy="14" r="6.25"/><path d="M15 9.5l1.75-1.75M18.5 4.25v1.5M21 6.75h-1.5M20.3 4.95l-1.05 1.05M7.6 12.4a3.2 3.2 0 0 1 2.2-2.2"/>',
  },
  gem: {
    line: '<path d="M8 4.5h8l4 5-8 10.5L4 9.5z"/><path d="M4 9.5h16M9.6 4.5L8.25 9.5 12 20l3.75-10.5-1.35-5"/>',
  },
  headset: {
    line: '<path d="M4.5 15v-3a7.5 7.5 0 0 1 15 0v3"/><rect x="3" y="13.5" width="4" height="6" rx="1.5"/><rect x="17" y="13.5" width="4" height="6" rx="1.5"/><path d="M6.25 19.5c0 1.2 1.5 2 3.75 2h1.5"/>',
  },
  star: {
    line: '<path d="M12 4.1l2.12 5.59 5.96.28-4.66 3.74L17 19.48l-5-3.28-5 3.28 1.58-5.77-4.66-3.74 5.96-.28z"/>',
  },
};

/** Cells per side of the tile, distance between cell origins, and glyph size, in CSS pixels. */
export const TILE_CELLS = 10;
export const CELL_STEP = 46;
export const GLYPH_SIZE = 22;
export const TILE_SIZE = TILE_CELLS * CELL_STEP;

/** One glyph placed on the tile: its cell and its top-left corner in pixels. */
export interface Placement {
  row: number;
  column: number;
  glyph: string;
  x: number;
  y: number;
}

/**
 * The cells that touch a cell, wrapping around the tile's edges. Odd rows sit
 * half a cell to the right, so a row touches two cells in the row above and
 * two in the row below.
 */
export function touchingCells(row: number, column: number): [number, number][] {
  const n = TILE_CELLS;
  const wrap = (value: number) => (value + n) % n;
  const shift = row % 2 === 1 ? 1 : -1;
  const cells: [number, number][] = [
    [row, wrap(column - 1)],
    [row, wrap(column + 1)],
  ];
  for (const other of [wrap(row - 1), wrap(row + 1)]) {
    cells.push([other, column], [other, wrap(column + shift)]);
  }
  return cells;
}

/**
 * Lays out the tile: glyphs dealt from a shuffled deck so each shows up about
 * as often as the others and none sits next to a copy of itself, with a few
 * pixels of jitter so the rows do not look ruled. Seeded, so the output is the
 * same on every run.
 */
export function layoutTile(): Placement[] {
  let seed = 11;
  const random = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };
  const names = Object.keys(GLYPHS);
  const shuffled = () =>
    names
      .map((name) => ({ name, key: random() }))
      .sort((a, b) => a.key - b.key)
      .map(({ name }) => name);
  const grid = new Map<string, string>();
  const placements: Placement[] = [];
  let deck: string[] = [];
  for (let row = 0; row < TILE_CELLS; row++) {
    for (let column = 0; column < TILE_CELLS; column++) {
      const taken = new Set(
        touchingCells(row, column)
          .map(([r, c]) => grid.get(`${String(r)},${String(c)}`))
          .filter((name) => name !== undefined),
      );
      let index = deck.findIndex((name) => !taken.has(name));
      while (index === -1) {
        deck = deck.concat(shuffled());
        index = deck.findIndex((name) => !taken.has(name));
      }
      const glyph = deck.splice(index, 1)[0];
      grid.set(`${String(row)},${String(column)}`, glyph);
      const x = column * CELL_STEP + (row % 2) * (CELL_STEP / 2) + (random() - 0.5) * 6;
      const y = row * CELL_STEP + 6 + (random() - 0.5) * 6;
      placements.push({ row, column, glyph, x, y });
    }
  }
  return placements;
}

/** Filled pixel rows as one path, a rectangle for each run of cells. */
function pixelPath(glyph: { pixels: string[]; cell: number; x: number; y: number }): string {
  let d = '';
  glyph.pixels.forEach((row, r) => {
    for (const run of row.matchAll(/X+/g)) {
      const x = glyph.x + run.index * glyph.cell;
      const y = glyph.y + r * glyph.cell;
      d += `M${String(x)} ${String(y)}h${String(run[0].length * glyph.cell)}v${String(glyph.cell)}h-${String(run[0].length * glyph.cell)}z`;
    }
  });
  return `<path d="${d}" fill="#000" stroke="none"/>`;
}

const round = (value: number) => String(Math.round(value * 10) / 10);

/**
 * The tile as SVG: every glyph once as a symbol, then a <use> per placement. A
 * glyph that runs off the right edge is drawn again at the left, so the tile
 * repeats without a seam. Only the alpha matters, since the page uses it as a
 * mask and paints its own color through it.
 */
export function buildPatternSvg(): string {
  const symbols = Object.entries(GLYPHS)
    .map(
      ([name, glyph]) =>
        `<symbol id="${name}" viewBox="0 0 24 24">${'line' in glyph ? glyph.line : pixelPath(glyph)}</symbol>`,
    )
    .join('');
  const uses = layoutTile()
    .flatMap(({ glyph, x, y }) =>
      x + GLYPH_SIZE > TILE_SIZE
        ? [
            { glyph, x, y },
            { glyph, x: x - TILE_SIZE, y },
          ]
        : [{ glyph, x, y }],
    )
    .map(
      ({ glyph, x, y }) =>
        `<use href="#${glyph}" x="${round(x)}" y="${round(y)}" width="${String(GLYPH_SIZE)}" height="${String(GLYPH_SIZE)}"/>`,
    )
    .join('');
  const size = String(TILE_SIZE);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" stroke="#000" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><defs>${symbols}</defs>${uses}</svg>\n`;
}
