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
 * Slug mat ky tu dac biet ("2 & 3" -> "2-3", "[AI] HaiVan" -> "ai-haivan") nen tim ca cum co the truot.
 * Thu cac cum tu lien tiep tu dai den ngan; o moi do dai thu bo tu CUOI roi bo tu DAU truoc
 * (hai mau hay gap: ky tu dac biet o cuoi "2 & 3", tien to dau "[AI]"). Bo cum 1 tu qua ngan (< 3 ky tu).
 * Nguoi goi chon du an co slug KHOP CHINH XAC.
 */
export function slugSearchQueries(slug: string, maxQueries = 8): string[] {
  const words = slug.split('-').filter(Boolean);
  const queries: string[] = [];
  for (let len = words.length; len >= 1 && queries.length < maxQueries; len--) {
    const removed = words.length - len;
    // Vi tri bat dau: 0 (bo tu cuoi), `removed` (bo tu dau), roi cac vi tri o giua
    const starts = new Set([0, removed, ...Array.from({ length: Math.max(removed - 1, 0) }, (_, i) => i + 1)]);
    for (const start of starts) {
      const phrase = words.slice(start, start + len).join(' ');
      if (len === 1 && phrase.length < 3) continue;
      if (!queries.includes(phrase)) queries.push(phrase);
    }
  }
  return queries.slice(0, maxQueries);
}
