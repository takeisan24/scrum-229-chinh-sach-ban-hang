# SCRUM-229 — Tab "Chính sách bán hàng"

Trang chi tiết dự án bất động sản: tab **Chính sách bán hàng** + nút **Chia sẻ**, dựng đủ trang theo Figma (header, banner, thanh tab, nội dung, footer).

## Phạm vi

1. **Nút Chia sẻ** — copy link trang dự án hiện tại kèm anchor tab: `{origin}/{phiên-bản}/du-an/{slug}#chinh-sach-ban-hang`
2. **Hiển thị nội dung chính sách** — render rich content từ CMS, phải support:
   - Text + format: bold, italic, màu, size
   - Ảnh, table
   - Căn lề, list, link
3. **Ghép API** `/portal/contents/get` (chỉ làm trên bản MUI)

```
GET /portal/contents/get?refId=<projectId>&refType=PROJECT&contentType=POLICY
Header: Accept-Language: vi | en
→ { code: "SUCCESS", data: { content: "<HTML>", fileInfoList, ... } | null }
```

## API (đã đối chiếu Swagger + gọi thử UAT)

Swagger: https://api-uat.vinhomes.biz.vn/hovixi/api/v1/swagger-ui/index.html

| Điểm | Thực tế BE | FE xử lý |
|---|---|---|
| `data.content` | Chuỗi HTML từ trình soạn thảo CMS | Sanitize rồi render, giữ nguyên định dạng của admin |
| `data: null` | Dự án chưa có chính sách (7/10 dự án trên UAT) | Hiện "đang được cập nhật" |
| `fileInfoList` | Trùng với ảnh đã có trong HTML | Bỏ qua |
| Slug dự án | BE **không có** trường slug / API tra theo slug | Slug theo SCRUM-7: `vinhomes-ocean-park-2-3`. Tra dự án bằng `GET /portal/projects/search?name=` (không phân biệt dấu), chọn dự án có slug khớp chính xác. Tên có ký tự đặc biệt (`&`, `[AI]`) thử thêm vài cụm từ ngắn hơn |
| Tên, mô tả, banner | Có sẵn trong kết quả `projects/search` | Dùng `name`, `shortDescription`, `fileInfo.fullLink` |
| Không tìm thấy | Không có dự án nào có slug khớp | Hiện "Không tìm thấy dự án" |
| CORS | UAT chặn `localhost` (403) | Dev đi qua proxy Vite (`vite.config.ts`). Deploy: BE cần mở CORS cho domain FE |

### Nguồn nội dung chính sách

Figma admin (page "Component", node `348:7830` — "Thêm mới phân khu" > tab Chính sách): admin nhập chính sách bằng **trình soạn thảo văn bản** với thanh công cụ: cỡ chữ, màu, B/I/U/S, căn trái/giữa/phải, list số/chấm, chèn ảnh, chèn link — khớp danh sách định dạng trong Jira. Phía người dùng Figma chỉ minh hoạ 1 ảnh poster vì admin chèn ảnh qua trình soạn thảo. → FE render HTML đầy đủ định dạng, không chỉ ảnh.

Lưu ý gửi BE: ảnh chính sách trên CDN nặng ~8,4 MB/ảnh; dự án 7 nhúng ảnh base64 vào HTML (~800 KB JSON).

## Hai phiên bản giao diện

Theo mẫu bàn giao của team (vd SCRUM-224): một app, hai phiên bản chạy song song, có nút chuyển phiên bản nổi ở góc phải dưới.

| Route | Phiên bản | Dữ liệu |
|---|---|---|
| `/mui/du-an/:slug` | **MUI** — bản chính | API thật UAT |
| `/bootstrap/du-an/:slug` | **Bootstrap** | Tĩnh theo Figma (`src/data/mockProject.ts`) |

Mở `/` sẽ vào `/mui/du-an/vinhomes-ocean-park-2-3#chinh-sach-ban-hang`.
CSS Bootstrap chỉ được nạp khi vào route Bootstrap và gỡ ra khi rời trang (`src/hooks/useBootstrapStylesheet.ts`), nên không đè lên MUI.
Nội dung chính sách hai bản dùng chung một component (`src/components/PolicyContent.tsx` + `src/styles/policy-content.css`).

### Phần dùng chung

| Đường dẫn | Nội dung |
|---|---|
| `src/constants/designTokens.ts` | Màu, gradient, shadow lấy từ biến Figma |
| `src/constants/projectTabs.ts` | 7 tab + icon, hash tương ứng |
| `src/assets/figma/` | Icon SVG, logo, ảnh banner/chính sách/bản đồ export từ Figma |
| `src/data/site.ts` | Nội dung header/footer |
| `src/data/mockProject.ts` | Dữ liệu tĩnh theo Figma (ảnh poster) — cho bản UI tĩnh |
| `src/data/mockPolicyFormats.ts` | HTML mẫu đủ định dạng theo thanh công cụ admin — dữ liệu test, không hiển thị cho người dùng |
| `src/lib/share.ts` | Tạo link chia sẻ + copy clipboard (có fallback cho HTTP) |
| `src/lib/sanitizeHtml.ts` | Sanitize HTML CMS bằng DOMPurify |
| `src/api/`, `src/types/` | Gọi API theo đúng Swagger, gom lỗi BE về `ApiError` |
| `src/hooks/useRequest.ts` | Gọi API kèm trạng thái loading/lỗi/thử lại, huỷ request cũ |
| `src/lib/projectSlug.ts` | Slug dự án theo SCRUM-7 (tên không dấu, khoảng trắng → `-`) |
| `src/lib/routes.ts`, `src/components/VersionSwitcher.tsx` | Route hai phiên bản + nút chuyển phiên bản |
| `src/hooks/useHashTab.ts`, `src/hooks/useSnapCarousel.ts` | Logic tab theo hash và carousel dùng chung |

## Design

Figma (bản copy đọc được qua MCP): file `f59d8Qzt9aRcgWr4Le7ERr` — web node `135:3696` (1440px), mobile node `247:10789` (402px).

## Estimate

| Hạng mục | Giờ |
|---|---|
| Dựng UI bằng MUI | 4h |
| Dựng lại bằng Bootstrap | 4h |
| Ghép API vào bản MUI | 3h |
| **Tổng** | **11h** |

⚠️ Estimate trên tính cho phạm vi chỉ có tab + nội dung. Phạm vi đã mở rộng sang dựng đủ trang (header, banner carousel, footer) và tra dự án theo slug → cần báo PM điều chỉnh.

## Chạy

```bash
npm install
cp .env.example .env   # tuy chon — mac dinh da tro qua proxy UAT
npm run dev
```

## Stack

Vite · React 19 · TypeScript · MUI · Bootstrap · React Router · Axios · DOMPurify

## Điểm cần xác nhận với BE/PM

- [x] `VITE_API_BASE_URL` — UAT `https://api-uat.vinhomes.biz.vn/hovixi/api/v1` (dev dùng proxy `/hovixi/api/v1`)
- [x] `/portal/contents/get` dùng **GET**, tham số trên query string
- [x] Shape response — đã sửa `src/types/` theo Swagger
- [x] Slug dự án: theo quy ước SCRUM-7
- [ ] Đề nghị BE thêm API tra dự án theo slug (hiện FE phải tìm theo tên)
- [ ] CORS cho domain deploy
- [ ] Design cho trạng thái loading / rỗng / lỗi (FE đang tự làm)

## Bảo mật

Nội dung trả về là **HTML thô từ CMS** → bắt buộc sanitize bằng DOMPurify trước khi render. Không dùng `dangerouslySetInnerHTML` trần.
