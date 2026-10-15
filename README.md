# SCRUM-229 — Tab "Chính sách bán hàng"

Trang chi tiết dự án bất động sản: tab **Chính sách bán hàng** + nút **Chia sẻ**, dựng đủ trang theo Figma (header, banner, thanh tab, nội dung, footer).

## Phạm vi

1. **Nút Chia sẻ** — copy link trang dự án hiện tại (theo slug) kèm anchor tab: `{origin}/du-an/{slug}#chinh-sach-ban-hang`
2. **Hiển thị nội dung chính sách** — render rich content từ CMS, phải support:
   - Text + format: bold, italic, màu, size
   - Ảnh, table
   - Căn lề, list, link
3. **Ghép API** `/portal/contents/get` (chỉ làm trên bản MUI)

```json
{ "refId": "<projectId>", "refType": "PROJECT", "contentType": "POLICY" }
```

## Cấu trúc branch

```
master ── 1e5abcd (khởi tạo)
             └── base (phần dùng chung) ──┬── feature/SCRUM-229-mui
                                          └── feature/SCRUM-229-bootstrap
```

| Branch | Nội dung |
|---|---|
| `master` | Giữ nguyên bản khởi tạo cho tới khi PM chọn phương án |
| `feature/SCRUM-229-mui` | Bản MUI — bản chính, sẽ ghép API |
| `feature/SCRUM-229-bootstrap` | Bản Bootstrap — UI tĩnh |

Hai bản là **hai phương án thay thế nhau**, mỗi branch là một app hoàn chỉnh và chỉ cài thư viện của mình (tránh CSS Bootstrap đè lên MUI). Cả hai cùng xuất phát từ commit **base** (phần dùng chung). PM chọn bản nào thì merge bản đó vào `master`.

Sửa phần dùng chung → commit trên một branch rồi `git cherry-pick` sang branch còn lại.
Đổi branch → chạy lại `npm install` vì dependency khác nhau.

### Phần dùng chung (commit base)

| Đường dẫn | Nội dung |
|---|---|
| `src/constants/designTokens.ts` | Màu, gradient, shadow lấy từ biến Figma |
| `src/constants/projectTabs.ts` | 7 tab + icon, hash tương ứng |
| `src/assets/figma/` | Icon SVG, logo, ảnh banner/chính sách/bản đồ export từ Figma |
| `src/data/site.ts` | Nội dung header/footer |
| `src/data/mockProject.ts` | Dữ liệu giả dự án + HTML chính sách (đủ mọi kiểu format để test) |
| `src/lib/share.ts` | Tạo link chia sẻ + copy clipboard (có fallback cho HTTP) |
| `src/lib/sanitizeHtml.ts` | Sanitize HTML CMS bằng DOMPurify |
| `src/api/`, `src/types/` | Stub API `/portal/contents/get` (chưa dùng — làm FE trước) |

## Design

Figma (bản copy đọc được qua MCP): file `f59d8Qzt9aRcgWr4Le7ERr` — web node `135:3696` (1440px), mobile node `247:10789` (402px).

## Estimate

| Hạng mục | Giờ |
|---|---|
| Dựng UI bằng MUI | 4h |
| Dựng lại bằng Bootstrap | 4h |
| Ghép API vào bản MUI | 3h |
| **Tổng** | **11h** |

⚠️ Estimate trên tính cho phạm vi chỉ có tab + nội dung. Phạm vi đã mở rộng sang dựng đủ trang (header, banner carousel, footer) → cần báo PM điều chỉnh.

## Chạy

```bash
git checkout feature/SCRUM-229-mui   # hoac feature/SCRUM-229-bootstrap
npm install
npm run dev
```

## Stack

Vite · React 19 · TypeScript · React Router · Axios · DOMPurify — cộng MUI hoặc Bootstrap tùy branch.

## Điểm cần xác nhận với BE/PM (BE để sau)

- [ ] `VITE_API_BASE_URL` — URL thật
- [ ] `/portal/contents/get` dùng **GET hay POST**
- [ ] Shape response thật (`src/types/content.ts` đang là phỏng đoán)
- [ ] Tab chuyển bằng hash `#` hay route riêng
- [ ] Design cho trạng thái loading / rỗng / lỗi

## Bảo mật

Nội dung trả về là **HTML thô từ CMS** → bắt buộc sanitize bằng DOMPurify trước khi render. Không dùng `dangerouslySetInnerHTML` trần.
