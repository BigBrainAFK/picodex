import { describe, expect, it } from 'vitest';
import { formatCount, parseRepoStats, REPO_URL, repoSlug } from './repo';

describe('repoSlug', () => {
  it('reads owner/name from the repository URL', () => {
    expect(repoSlug(REPO_URL)).toBe('rasalopa/picodex');
  });

  it('accepts a trailing slash or .git', () => {
    expect(repoSlug('https://github.com/rasalopa/picodex/')).toBe('rasalopa/picodex');
    expect(repoSlug('https://github.com/rasalopa/picodex.git')).toBe('rasalopa/picodex');
  });

  it('rejects anything that is not a GitHub repository URL', () => {
    expect(repoSlug('https://gitlab.com/rasalopa/picodex')).toBeNull();
    expect(repoSlug('https://github.com/rasalopa')).toBeNull();
    expect(repoSlug('https://github.com/rasalopa/picodex/issues')).toBeNull();
  });
});

describe('parseRepoStats', () => {
  it('takes the star and fork counts from an API response', () => {
    expect(
      parseRepoStats({ full_name: 'rasalopa/picodex', stargazers_count: 133, forks_count: 10 }),
    ).toEqual({
      stars: 133,
      forks: 10,
    });
  });

  it('accepts zero', () => {
    expect(parseRepoStats({ stargazers_count: 0, forks_count: 0 })).toEqual({ stars: 0, forks: 0 });
  });

  it('returns null for an error body, a missing count or a count that is not a whole number', () => {
    expect(parseRepoStats({ message: 'API rate limit exceeded' })).toBeNull();
    expect(parseRepoStats({ stargazers_count: 5 })).toBeNull();
    expect(parseRepoStats({ stargazers_count: '5', forks_count: 1 })).toBeNull();
    expect(parseRepoStats({ stargazers_count: 1.5, forks_count: 1 })).toBeNull();
    expect(parseRepoStats({ stargazers_count: -1, forks_count: 1 })).toBeNull();
    expect(parseRepoStats(null)).toBeNull();
    expect(parseRepoStats('not json')).toBeNull();
  });
});

describe('formatCount', () => {
  it('shows small counts as they are', () => {
    expect(formatCount(0, 'en')).toBe('0');
    expect(formatCount(133, 'en')).toBe('133');
  });

  it('shortens thousands in the reader language', () => {
    expect(formatCount(1234, 'en')).toBe('1.2K');
    expect(formatCount(1234, 'es')).toContain('1,2');
  });
});
