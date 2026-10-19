/** Hai bản giao diện chạy song song trong cùng app (theo mẫu bàn giao của team, vd SCRUM-224). */
export type UiVersion = 'mui' | 'bootstrap';

export const UI_VERSIONS: { id: UiVersion; label: string }[] = [
  { id: 'mui', label: 'MUI' },
  { id: 'bootstrap', label: 'Bootstrap' },
];

/** Dự án mặc định khi mở app: VINHOMES OCEAN PARK 2 & 3 trên UAT (đúng dự án trong Figma). */
export const DEFAULT_PROJECT_SLUG = 'vinhomes-ocean-park-2-3';

export function projectPath(version: UiVersion, slug: string): string {
  return `/${version}/du-an/${slug}`;
}

/** Link nội bộ (menu, logo, breadcrumb...) giữ nguyên phiên bản đang xem, vd "/gioi-thieu" -> "/bootstrap/gioi-thieu". */
export function versionPath(version: UiVersion, path: string): string {
  return path === '/' ? `/${version}` : `/${version}${path}`;
}

/** Trang mặc định của mỗi phiên bản — các trang ngoài phạm vi (Giới thiệu, Tin tức...) quay về đây. */
export function defaultProjectPath(version: UiVersion): string {
  return `${projectPath(version, DEFAULT_PROJECT_SLUG)}#chinh-sach-ban-hang`;
}
