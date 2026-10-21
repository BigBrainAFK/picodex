import { useLang, useT } from '../i18n';
import { formatCount, REPO_URL, repoSlug } from '../lib/repo';
import { IconFork, IconGitHub, IconStar } from './icons';
import './RepoCard.css';

/**
 * The repository card at the right of the header: GitHub's mark, the
 * repository name and, when the build could read them, its stars and forks
 * (see src/lib/repo.ts for where the counts come from).
 */
export function RepoCard() {
  const t = useT();
  const { lang } = useLang();
  const slug = repoSlug(REPO_URL) ?? REPO_URL;
  const stats = __REPO_STATS__;
  const stars = stats === null ? null : formatCount(stats.stars, lang);
  const forks = stats === null ? null : formatCount(stats.forks, lang);
  const label =
    stars === null || forks === null
      ? t.app.repoCard(slug)
      : t.app.repoCardStats(slug, stars, forks);
  return (
    <a
      className="repo-card"
      href={REPO_URL}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
    >
      <IconGitHub className="repo-card__mark" />
      <span className="repo-card__text">
        <span className="repo-card__name">{slug}</span>
        {stars !== null && forks !== null && (
          <span className="repo-card__stats">
            <span className="repo-card__stat">
              <IconStar className="repo-card__icon" />
              {stars}
            </span>
            <span className="repo-card__stat">
              <IconFork className="repo-card__icon" />
              {forks}
            </span>
          </span>
        )}
      </span>
    </a>
  );
}
