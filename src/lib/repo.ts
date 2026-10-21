/**
 * The PicoDex repository on GitHub, and the star and fork counts the header
 * card shows for it.
 *
 * The counts are read from the GitHub API once, when the app is built (see
 * vite.config.ts), and compiled in. A visit to PicoDex makes no request to
 * GitHub for them, so they are as fresh as the last deploy.
 */

export const REPO_URL = 'https://github.com/rasalopa/picodex';

export interface RepoStats {
  stars: number;
  forks: number;
}

/** `owner/name` from a GitHub repository URL, or null for anything else. */
export function repoSlug(url: string): string | null {
  const match = /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+?)(?:\.git)?\/?$/.exec(url);
  return match === null ? null : `${match[1]}/${match[2]}`;
}

function isCount(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0;
}

/** The counts in a GitHub API repository response, or null when it is not one. */
export function parseRepoStats(body: unknown): RepoStats | null {
  if (typeof body !== 'object' || body === null) return null;
  const { stargazers_count: stars, forks_count: forks } = body as Record<string, unknown>;
  return isCount(stars) && isCount(forks) ? { stars, forks } : null;
}

/** A count the way GitHub shows it, short past a thousand: 133, 1.2K, 1,2 mil. */
export function formatCount(count: number, lang: string): string {
  return new Intl.NumberFormat(lang, { notation: 'compact', maximumFractionDigits: 1 }).format(
    count,
  );
}
