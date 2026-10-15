/**
 * BE khong co truong slug cho du an -> FE tu tao: `{ten-khong-dau}-{id}`,
 * vd "VINHOMES OCEAN PARK 2 & 3" (id 65) -> `vinhomes-ocean-park-2-3-65`.
 * Id o cuoi de goi API; phan chu chi de link de doc va tot cho SEO.
 */
export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/gi, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function buildProjectSlug(project: { id: number; name: string }): string {
  const text = slugify(project.name);
  return text ? `${text}-${project.id}` : String(project.id);
}

/** Lay id tu slug (so o cuoi). Tra null neu slug khong hop le. */
export function parseProjectId(slug: string | undefined): number | null {
  const match = slug?.match(/(?:^|-)(\d+)$/);
  return match ? Number(match[1]) : null;
}
