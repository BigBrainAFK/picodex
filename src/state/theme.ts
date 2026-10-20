/**
 * The color theme as picked with the footer button: dark (the default), light,
 * or system, which follows the operating system's setting while it is picked.
 *
 * The inline script in index.html applies a stored pick to `<html data-theme>`
 * before the first paint, so a light page does not flash dark while the app
 * loads. This hook keeps that attribute, and the stored pick, in step with the
 * button afterwards. The CSS looks only at the attribute (see src/index.css),
 * and the rules themselves live in src/lib/theme.ts.
 */
import { useCallback, useEffect, useState } from 'react';
import { parseThemePick, showsLight, THEME_STORAGE_KEY, type ThemePick } from '../lib/theme';

const LIGHT_QUERY = '(prefers-color-scheme: light)';

function storedPick(): ThemePick {
  try {
    return parseThemePick(localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    // storage can be blocked; the page then stays on the default
    return parseThemePick(null);
  }
}

function apply(pick: ThemePick): void {
  if (showsLight(pick, matchMedia(LIGHT_QUERY).matches)) {
    document.documentElement.dataset.theme = 'light';
  } else {
    delete document.documentElement.dataset.theme;
  }
}

/** The current pick and its setter, for the footer button. */
export function useTheme(): [ThemePick, (next: ThemePick) => void] {
  const [pick, setPickState] = useState<ThemePick>(storedPick);
  useEffect(() => {
    apply(pick);
    if (pick !== 'system') return undefined;
    // while the system decides, follow it when it changes (a scheduled switch at sunset)
    const query = matchMedia(LIGHT_QUERY);
    const follow = () => apply('system');
    query.addEventListener('change', follow);
    return () => query.removeEventListener('change', follow);
  }, [pick]);
  const setPick = useCallback((next: ThemePick) => {
    setPickState(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // not persisting is fine; the pick still applies for this visit
    }
  }, []);
  return [pick, setPick];
}
