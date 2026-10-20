import { describe, expect, it } from 'vitest';
import indexHtml from '../../index.html?raw';
import { nextThemePick, parseThemePick, showsLight, THEME_PICKS, THEME_STORAGE_KEY } from './theme';

describe('parseThemePick', () => {
  it('keeps the picks it knows', () => {
    expect(parseThemePick('dark')).toBe('dark');
    expect(parseThemePick('light')).toBe('light');
    expect(parseThemePick('system')).toBe('system');
  });

  it('falls back to dark for nothing stored or a value it does not know', () => {
    expect(parseThemePick(null)).toBe('dark');
    expect(parseThemePick('')).toBe('dark');
    expect(parseThemePick('Light')).toBe('dark');
    expect(parseThemePick('auto')).toBe('dark');
  });
});

describe('nextThemePick', () => {
  it('cycles dark, light, system and back to dark', () => {
    expect(nextThemePick('dark')).toBe('light');
    expect(nextThemePick('light')).toBe('system');
    expect(nextThemePick('system')).toBe('dark');
  });
});

describe('showsLight', () => {
  it('shows light for the light pick whatever the system prefers', () => {
    expect(showsLight('light', false)).toBe(true);
    expect(showsLight('light', true)).toBe(true);
  });

  it('shows dark for the dark pick whatever the system prefers', () => {
    expect(showsLight('dark', false)).toBe(false);
    expect(showsLight('dark', true)).toBe(false);
  });

  it('follows the system for the system pick', () => {
    expect(showsLight('system', true)).toBe(true);
    expect(showsLight('system', false)).toBe(false);
  });
});

/**
 * index.html cannot import this module: its script has to run before the bundle loads, or a light
 * page would flash dark first. So it repeats the rule, and this runs it for every stored value and
 * system preference to check it lands where showsLight says.
 */
describe('the theme script in index.html', () => {
  const scripts = [...indexHtml.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const themeScript = scripts.find((code) => code.includes(THEME_STORAGE_KEY));

  function runScript(stored: string | null, prefersLight: boolean, storageThrows = false) {
    const dataset: Record<string, string> = {};
    const localStorage = {
      getItem(key: string) {
        if (storageThrows) throw new Error('storage blocked');
        return key === THEME_STORAGE_KEY ? stored : null;
      },
    };
    const matchMedia = (query: string) => ({
      matches: query === '(prefers-color-scheme: light)' && prefersLight,
    });
    const document = { documentElement: { dataset } };
    new Function('localStorage', 'matchMedia', 'document', themeScript ?? '')(
      localStorage,
      matchMedia,
      document,
    );
    return dataset.theme === 'light';
  }

  it('is there, reading the same storage key', () => {
    expect(themeScript).toBeDefined();
  });

  for (const stored of [null, 'garbage', ...THEME_PICKS]) {
    for (const prefersLight of [false, true]) {
      it(`agrees with showsLight for ${String(stored)} when the system prefers ${prefersLight ? 'light' : 'dark'}`, () => {
        const expected = showsLight(parseThemePick(stored), prefersLight);
        expect(runScript(stored, prefersLight)).toBe(expected);
      });
    }
  }

  it('opens dark when storage cannot be read', () => {
    expect(runScript('light', true, true)).toBe(false);
  });
});
