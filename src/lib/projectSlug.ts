/**
 * Slug du an theo quy uoc SCRUM-7: ten tieng Viet -> khong dau, khoang trang -> "-".
 * Vd "VINHOMES HẢI VÂN BAY" -> `vinhomes-hai-van-bay`. Ky tu dac biet bi bo: "2 & 3" -> `2-3`.
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

export function buildProjectSlug(project: { name: string }): string {
  return slugify(project.name);
}

/**
 * BE khong co API tra du an theo slug, chi co tim theo ten (khong phan biet dau).
 * Slug mat ky tu dac biet ("2 & 3" -> "2-3", "[AI] Vin..." -> "ai-vin...") nen tim ca cum co the truot:
 * thu ca cum truoc, roi bot dan tu o cuoi, roi o dau — nguoi goi chon du an co slug KHOP CHINH XAC.
 */
export function slugSearchQueries(slug: string, maxQueries = 8): string[] {
  const words = slug.split('-').filter(Boolean);
  const queries = [words.join(' ')];
  for (let end = words.length - 1; end >= 2; end--) queries.push(words.slice(0, end).join(' '));
  for (let start = 1; words.length - start >= 2; start++) queries.push(words.slice(start).join(' '));
  return [...new Set(queries)].slice(0, maxQueries);
}
