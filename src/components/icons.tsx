import type { ReactNode } from 'react';

export interface IconProps {
  className?: string;
}

/** Shared line-icon frame: 24-grid, currentColor stroke, decorative only. */
function Icon({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** Library: a grid of game tiles. */
export function IconGrid(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </Icon>
  );
}

/** Covers / box art: a framed picture. */
export function IconImage(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <circle cx="8.5" cy="9.5" r="1.6" />
      <path d="M4 18l5-4.5 3.5 3 3-2.5 4.5 4" />
    </Icon>
  );
}

/** Screenshots: the console's two screens, one above the other. */
export function IconScreens(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="4" y="3" width="16" height="8" rx="1.5" />
      <rect x="4" y="13" width="16" height="8" rx="1.5" />
    </Icon>
  );
}

/** Play stats: bars on a baseline. */
export function IconChart(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 20h16" />
      <path d="M7.5 20v-5.5" />
      <path d="M12 20V6" />
      <path d="M16.5 20v-9" />
    </Icon>
  );
}

/** Health: a heartbeat trace. */
export function IconPulse(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 12h4l2.5-6 4 12 2.5-6H21" />
    </Icon>
  );
}

/** Folder banners: a folder. */
export function IconFolder(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 7a2 2 0 0 1 2-2h3.5l2 2H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </Icon>
  );
}

/** File associations: a chain link. */
export function IconLink(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9.5 14.5l5-5" />
      <path d="M11 6.8l1.3-1.3a3.6 3.6 0 0 1 5.1 5.1l-1.9 1.9" />
      <path d="M13 17.2l-1.3 1.3a3.6 3.6 0 0 1-5.1-5.1l1.9-1.9" />
    </Icon>
  );
}

/** Games count: a cartridge. */
export function IconCartridge(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <rect x="8.5" y="6" width="7" height="4" rx="1" />
      <path d="M9 14h6" />
      <path d="M9 17h6" />
    </Icon>
  );
}

/** Systems count: stacked layers. */
export function IconLayers(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </Icon>
  );
}

/** Edit: a pencil, drawn here because many system fonts have no glyph for U+1F589. */
export function IconPencil(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M15.5 4.5l4 4L9 19l-5 1 1-5z" />
      <path d="M13.5 6.5l4 4" />
    </Icon>
  );
}

/** Favorites: a heart. */
export function IconHeart(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 19.5C5.5 15 3.5 12 3.5 9A3.6 3.6 0 0 1 12 6.9 3.6 3.6 0 0 1 20.5 9c0 3-2 6-8.5 10.5z" />
    </Icon>
  );
}

/** Play time: a clock. */
export function IconClock(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Icon>
  );
}

/** Completed: a check in a circle. */
export function IconCheckCircle(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5.5" />
    </Icon>
  );
}

/*
 * The theme icons are a sun drawn as an eight-point badge. Unlike the line
 * icons above, light and system fill the badge and cut their detail out of it
 * (even-odd fill), which stays legible at footer size; dark is the badge in
 * outline, a sun switched off.
 */
const SUN_BADGE_FILLED = 'M12 1l3 3h5v5l3 3-3 3v5h-5l-3 3-3-3H4v-5l-3-3 3-3V4h5z';
const SUN_BADGE_OUTLINE = 'M12 2l3 3h4v4l3 3-3 3v4h-4l-3 3-3-3H5v-4l-3-3 3-3V5h4z';

/** Light theme: a filled sun with the right half of its disc cut out. */
export function IconThemeLight(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d={`${SUN_BADGE_FILLED}M12 7a5 5 0 0 1 0 10z`}
        fill="currentColor"
        fillRule="evenodd"
        stroke="none"
      />
    </Icon>
  );
}

/** Dark theme: the sun in outline, with an empty disc. */
export function IconThemeDark(props: IconProps) {
  return (
    <Icon {...props}>
      <path d={SUN_BADGE_OUTLINE} />
      <circle cx="12" cy="12" r="4" />
    </Icon>
  );
}

/** System theme: a filled sun with an A cut out, for automatic. */
export function IconThemeSystem(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d={`${SUN_BADGE_FILLED}M10.9 6.75h2.2l3.6 10.25h-2.1l-.8-2.4h-3.6l-.8 2.4H7.3zM12 9.4L10.75 13h2.5z`}
        fill="currentColor"
        fillRule="evenodd"
        stroke="none"
      />
    </Icon>
  );
}

/** Repository stars: a five-point star. */
export function IconStar(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 4.1l2.12 5.59 5.96.28-4.66 3.74L17 19.48l-5-3.28-5 3.28 1.58-5.77-4.66-3.74 5.96-.28z" />
    </Icon>
  );
}

/** Repository forks: one line splitting in two, with a node at each end. */
export function IconFork(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="7" cy="5.5" r="2" />
      <circle cx="17" cy="5.5" r="2" />
      <circle cx="12" cy="18.5" r="2" />
      <path d="M7 7.5V9a2.5 2.5 0 0 0 2.5 2.5h5A2.5 2.5 0 0 0 17 9V7.5M12 11.5v5" />
    </Icon>
  );
}

/** GitHub's mark (Octicons mark-github, MIT), filled, for links to the repository. */
export function IconGitHub({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
    </svg>
  );
}

/** Launches: a play triangle. */
export function IconPlay(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 5.5l11 6.5-11 6.5z" />
    </Icon>
  );
}
