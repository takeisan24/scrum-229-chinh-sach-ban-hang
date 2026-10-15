# SCRUM-229 — Tab "Chính sách bán hàng"

Trang chi tiết dự án: tab **Chính sách bán hàng** + nút **Chia sẻ**, dựng theo Figma, hai phiên bản **MUI** và **Bootstrap** trong cùng một app.
Giải thích chi tiết (API, slug, quyết định kỹ thuật) xem comment trên ticket Jira SCRUM-229.

## Chạy

Cần **Node `^20.19` hoặc `>=22.12`**.

```bash
npm install
npm run dev     # http://localhost:5173
```

Không cần `.env` — dev gọi API UAT qua proxy của Vite.

## Hai phiên bản

| Route | Phiên bản | Dữ liệu |
|---|---|---|
| `/mui/du-an/:slug` | MUI — bản chính | API UAT |
| `/bootstrap/du-an/:slug` | Bootstrap | Tĩnh theo Figma (luôn hiện dự án mẫu) |

Chuyển qua lại bằng nút **MUI \| Bootstrap** ở góc phải dưới.

## Code nằm ở đâu

| Thư mục | Nội dung |
|---|---|
| `src/pages/mui/` | Chỉ bản MUI |
| `src/pages/bootstrap/` | Chỉ bản Bootstrap |
| `src/components/PolicyContent.tsx` | Hiển thị nội dung chính sách — dùng chung 2 bản |
| `src/api/`, `src/lib/`, `src/hooks/` | Gọi API, slug, sanitize HTML, copy link, tab theo `#` |

## Link test nhanh (bản MUI)

| Link | Mong đợi |
|---|---|
| `/mui/du-an/vinhomes-ocean-park-2-3#chinh-sach-ban-hang` | Chính sách dạng ảnh |
| `/mui/du-an/vinhomes-hai-van-bay#chinh-sach-ban-hang` | Chữ có định dạng + ảnh |
| `/mui/du-an/vinhomes-global-gate-ha-long#chinh-sach-ban-hang` | "Đang được cập nhật" |
| `/mui/du-an/khong-ton-tai` | "Không tìm thấy dự án" |

Bấm **Chia sẻ** → dán link vào tab mới → mở thẳng tab Chính sách bán hàng.
