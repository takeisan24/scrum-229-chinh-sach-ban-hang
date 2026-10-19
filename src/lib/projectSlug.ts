/**
 * Slug dự án theo quy ước SCRUM-7: tên tiếng Việt -> không dấu, khoảng trắng -> "-".
 * Vd "VINHOMES HẢI VÂN BAY" -> `vinhomes-hai-van-bay`. Ký tự đặc biệt bị bỏ: "2 & 3" -> `2-3`.
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
 * BE không có API tra dự án theo slug, chỉ có tìm theo tên (không phân biệt dấu).
 * Slug mất ký tự đặc biệt ("2 & 3" -> "2-3", "[AI] HaiVan" -> "ai-haivan") nên tìm cả cụm có thể trượt.
 * Thử các cụm từ liên tiếp từ dài đến ngắn; ở mỗi độ dài thử bỏ từ CUỐI rồi bỏ từ ĐẦU trước
 * (hai mẫu hay gặp: ký tự đặc biệt ở cuối "2 & 3", tiền tố đầu "[AI]"). Bỏ cụm 1 từ quá ngắn (< 3 ký tự).
 * Người gọi chọn dự án có slug KHỚP CHÍNH XÁC.
 */
export function slugSearchQueries(slug: string, maxQueries = 8): string[] {
  const words = slug.split('-').filter(Boolean);
  const queries: string[] = [];
  for (let len = words.length; len >= 1 && queries.length < maxQueries; len--) {
    const removed = words.length - len;
    // Vị trí bắt đầu: 0 (bỏ từ cuối), `removed` (bỏ từ đầu), rồi các vị trí ở giữa
    const starts = new Set([0, removed, ...Array.from({ length: Math.max(removed - 1, 0) }, (_, i) => i + 1)]);
    for (const start of starts) {
      const phrase = words.slice(start, start + len).join(' ');
      if (len === 1 && phrase.length < 3) continue;
      if (!queries.includes(phrase)) queries.push(phrase);
    }
  }
  return queries.slice(0, maxQueries);
}
