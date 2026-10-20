/**
 * The color theme the footer button picks: dark (the default), light, or
 * system, which follows the operating system's light or dark setting.
 *
 * The inline script in index.html applies the same rule before the first
 * paint; theme.test.ts runs that script against these functions so the two
 * cannot drift apart.
 */

/** Where the pick is remembered. The script in index.html reads the same key. */
export const THEME_STORAGE_KEY = 'picodex-theme';

/** The picks in the order the button cycles through them. */
export const THEME_PICKS = ['dark', 'light', 'system'] as const;

export type ThemePick = (typeof THEME_PICKS)[number];

/** A stored value read back as a pick. Anything missing or unknown is the dark default. */
export function parseThemePick(stored: string | null): ThemePick {
  return stored === 'light' || stored === 'system' ? stored : 'dark';
}

/** The pick a click on the button moves to: dark, light, system, then dark again. */
export function nextThemePick(pick: ThemePick): ThemePick {
  return THEME_PICKS[(THEME_PICKS.indexOf(pick) + 1) % THEME_PICKS.length];
}

/** Whether a pick shows the light theme, given whether the system prefers light. */
export function showsLight(pick: ThemePick, systemPrefersLight: boolean): boolean {
  return pick === 'light' || (pick === 'system' && systemPrefersLight);
}
