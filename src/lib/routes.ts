/** Hai ban giao dien chay song song trong cung app (theo mau ban giao cua team, vd SCRUM-224). */
export type UiVersion = 'mui' | 'bootstrap';

export const UI_VERSIONS: { id: UiVersion; label: string }[] = [
  { id: 'mui', label: 'MUI' },
  { id: 'bootstrap', label: 'Bootstrap' },
];

/** Du an mac dinh khi mo app: VINHOMES OCEAN PARK 2 & 3 tren UAT (dung du an trong Figma). */
export const DEFAULT_PROJECT_SLUG = 'vinhomes-ocean-park-2-3';

export function projectPath(version: UiVersion, slug: string): string {
  return `/${version}/du-an/${slug}`;
}
