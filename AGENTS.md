# AGENTS.md — Kiến trúc & quy tắc code

Hướng dẫn cho người và AI agent khi sửa code repo này. Cách chạy, tính năng, link test: xem [README.md](README.md).

**Dự án:** trang chi tiết dự án bất động sản, tab "Chính sách bán hàng" (SCRUM-229).
Phạm vi ticket: nút Chia sẻ + hiển thị nội dung chính sách từ `GET /portal/contents/get`.
Mọi thứ khác (header, footer, banner, 6 tab còn lại, tra slug) dựng thêm để trang chạy độc lập.

---

## 1. Lệnh

| Việc | Lệnh |
|---|---|
| Chạy dev | `npm run dev` → http://localhost:5173 (API đi qua proxy, không cần `.env`) |
| Kiểm tra trước khi commit | `npm run lint && npm run build` (build đã gồm `tsc -b`) |
| Test tự động | Chưa có. Kiểm tra tay bằng các link trong README mục 5 |

Commit chỉ khi lint và build đều qua.

---

## 2. Kiến trúc

### 2.1 Hai bản giao diện trong một app

| Route | Bản | Dữ liệu |
|---|---|---|
| `/mui/du-an/:slug` | MUI — bản chính | API thật (UAT) |
| `/bootstrap/du-an/:slug` | Bootstrap — UI tĩnh theo Figma | `src/data/mockProject.ts` |

- `App.tsx` nạp mỗi bản bằng `React.lazy` → vào bản nào chỉ tải code của bản đó.
- Route lạ → về dự án mặc định, giữ nguyên bản đang xem (`src/lib/routes.ts`).
- `VersionSwitcher` chuyển bản, giữ slug + hash.

### 2.2 Các lớp và chiều phụ thuộc

```
types/  constants/  data/    Kiểu theo Swagger, hằng số (tab, màu Figma), dữ liệu tĩnh — chỉ import assets
  ↑
lib/                        Hàm thuần, không React: slug, sanitize, share, routes
  ↑
api/  hooks/                Gọi BE (client.ts: axios + gom lỗi) · hook React dùng chung
  ↑
components/                 UI dùng chung cho CẢ HAI bản (PolicyContent, VersionSwitcher)
  ↑
pages/mui/  pages/bootstrap/    UI riêng từng bản
```

Quy tắc phụ thuộc (hiện code đang tuân thủ, giữ nguyên):
- Chỉ import theo chiều mũi tên lên. Thư mục dùng chung **không** import từ `pages/`.
- `pages/mui` và `pages/bootstrap` **không** import lẫn nhau. Cần dùng chung → chuyển xuống `components/`, `hooks/` hoặc `lib/`.
  Lý do: mỗi bản là một chunk riêng; import chéo sẽ kéo MUI vào bản Bootstrap và ngược lại.

### 2.3 Luồng dữ liệu bản MUI

```
URL /mui/du-an/{slug}#chinh-sach-ban-hang
 │
 ├─ ProjectDetailMui.tsx    slugify() chuẩn hoá URL (chữ hoa/có dấu → redirect, giữ hash)
 ├─ api/projects.ts         findProjectBySlug: thử các cụm từ (lib/projectSlug.ts) qua
 │                          /portal/projects/search, chọn dự án có slug KHỚP CHÍNH XÁC → project.id
 │                          (giả lập trang chi tiết dự án — ngoài phạm vi ticket)
 ├─ ProjectView.tsx         tab theo hash (hooks/useHashTab.ts); chỉ mount tab chính sách khi mở lần đầu
 ├─ PolicyPanel.tsx         useRequest → api/contents.ts → GET /portal/contents/get
 │                          (refId = project.id, refType = PROJECT, contentType = POLICY)
 └─ PolicyContent.tsx       sanitizeHtml() → dangerouslySetInnerHTML + styles/policy-content.css
```

Nút Chia sẻ: `lib/share.ts` (tạo link `{origin}{pathname}#chinh-sach-ban-hang`, copy có dự phòng cho HTTP) → `ShareButton.tsx` / `BsShareButton.tsx`.

---

## 3. Quy tắc code

### 3.1 Gọi API
- Mọi request đi qua `getData()` trong `src/api/client.ts`. Thêm endpoint = thêm một hàm trong `src/api/*.ts`.
  Lý do: BE báo lỗi bằng cả HTTP status lẫn `code ≠ SUCCESS`; `getData` gom về `ApiError` ở một chỗ.
- Kiểu request/response đặt trong `src/types/`, bám đúng tên Swagger. Trường có thể `null` phải khai báo `| null`
  (BE trả `data: null` cho dự án chưa có nội dung — 7/10 dự án trên UAT).
- Trong component, gọi API bằng `useRequest(key, (signal) => apiFn(..., signal))` và luôn truyền `signal` xuống.
  Lý do: đổi trang giữa chừng thì request cũ bị huỷ, không ghi đè dữ liệu mới.
- UI luôn có đủ 3 trạng thái: đang tải (skeleton giữ chỗ), lỗi (có nút "Thử lại"), rỗng (thông báo).

### 3.2 Nội dung HTML từ CMS
- Chỉ render HTML của CMS qua `<PolicyContent html=... />`. `dangerouslySetInnerHTML` chỉ được dùng trong `PolicyContent.tsx`.
  Lý do: `sanitizeHtml()` chặn mã độc, thẻ phá trang, `position: fixed/absolute`, `z-index`.
- `sanitizeHtml` phải giữ thuộc tính `style` — đó là màu, cỡ chữ, căn lề admin đặt (yêu cầu "Format chữ" của ticket).
- `policy-content.css` không đặt màu / cỡ chữ / căn lề cho nội dung. Lý do: sẽ đè lên định dạng của admin.
  Chỉ thêm CSS chống vỡ layout (ảnh, table tràn ngang).
- Không render `fileInfoList` của `contents/get`: trùng với ảnh đã nhúng trong `content`.
- `contents/get` cũng phục vụ `OVERVIEW` và `LOCATION` → tab Tổng quan / Vị trí dùng lại được `PolicyContent` + `sanitizeHtml`.

### 3.3 Giao diện
- **MUI:** import theo từng component (`import Button from '@mui/material/Button'`), style bằng `sx`.
  Màu, gradient, shadow lấy từ `src/constants/designTokens.ts` — không viết mã màu trong `.tsx`.
- **Bootstrap:** mọi selector trong `bootstrap-page.css` nằm dưới `.bs-page`. Không import CSS Bootstrap tĩnh —
  chỉ nạp qua `useBootstrapStylesheet()`. Không dùng `bootstrap.js`; hành vi (menu, toast) viết bằng React.
  Lý do: CSS reset của Bootstrap sẽ đè lên bản MUI nếu nạp toàn cục.
- Số đo, màu, bo góc theo Figma (web 1440px, mobile 402px). Bản MUI hiển thị nội dung đúng như API trả;
  Figma chỉ là chuẩn pixel cho bản Bootstrap.

### 3.4 URL, slug, tab
- Slug tạo bằng `slugify()` trong `src/lib/projectSlug.ts` (quy ước SCRUM-7: bỏ dấu, khoảng trắng → `-`, không có id).
  Không tự viết lại logic slug ở chỗ khác.
- Đường dẫn nội bộ tạo bằng `projectPath()` / `versionPath()` trong `src/lib/routes.ts` để giữ nguyên bản đang xem.
- Tab và hash khai báo một chỗ: `src/constants/projectTabs.ts`. Đổi tab bằng `useHashTab()` (giữ query string).

### 3.5 Phong cách
- TypeScript strict; không dùng `any`. Nháy đơn, có dấu chấm phẩy (trong `src/`).
- Component: `export default function Ten()`. Hook, hàm tiện ích, API: named export.
- Chú thích viết **tiếng Việt có dấu**, giải thích *vì sao* (lý do nghiệp vụ, số liệu UAT, node Figma), không lặp lại code.
- Commit: `type(scope): Mo ta` — tiếng Việt **không dấu**, type theo Conventional Commits
  (`feat`, `fix`, `ref`, `perf`, `docs`, `chore`...), footer `Refs SCRUM-xxx`.
- Làm việc trên một nhánh `master` (repo public, nộp bài theo mẫu SCRUM-224).

---

## 4. Lưu ý về Backend (UAT)

| Điểm | Chi tiết |
|---|---|
| Base URL | `https://api-uat.vinhomes.biz.vn/hovixi/api/v1`, Swagger tại `/swagger-ui/index.html` |
| CORS | UAT chặn origin `localhost` → dev đi qua proxy `/hovixi` trong `vite.config.ts`. Deploy cần BE mở CORS cho domain FE (`VITE_API_BASE_URL`) |
| Giới hạn | ~100 request/phút mỗi IP, vượt → HTTP 429 `RATE_LIMIT_EXCEEDED`. Không gọi API trong vòng lặp không giới hạn |
| Slug | BE chưa có API tra dự án theo slug → đang tìm theo tên. Trùng slug thì lấy dự án khớp đầu tiên |
| Nội dung | `content` là HTML từ trình soạn thảo CMS, có thể chứa ảnh base64 (~800 KB) hoặc ảnh CDN ~8 MB |
| Lỗi | Tham số sai → HTTP 400 `VALIDATION_FAILED`; `refId` không tồn tại → 200 với `data: null` |

---

## 5. Thêm tính năng / tab mới

1. Khai báo kiểu theo Swagger trong `src/types/`.
2. Thêm hàm gọi API trong `src/api/` (dùng `getData`).
3. Tạo component trong `src/pages/mui/components/`, gọi API bằng `useRequest`, đủ 3 trạng thái.
4. Nếu bản Bootstrap cũng cần: logic dùng chung đặt ở `hooks/` hoặc `lib/`, UI riêng trong `src/pages/bootstrap/components/`.
5. Nối vào `ProjectView.tsx` (và `ProjectDetailBootstrap.tsx`) theo `id` tab trong `projectTabs.ts`.
6. Chạy `npm run lint && npm run build`, kiểm tra tay ở 1440px và 402px, cập nhật README nếu đổi hành vi.

---

## 6. Không làm

- Không commit `.env` hay giá trị thật; chỉ commit `.env.example`.
- Không đưa tài liệu nội bộ (báo cáo, trao đổi với PM) vào repo — repo public.
- Không thêm thư viện mới khi vài dòng code tự viết là đủ (ví dụ: đã có `useRequest`, chưa cần React Query).
