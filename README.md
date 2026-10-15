# SCRUM-229 — Tab "Chính sách bán hàng"

Trang chi tiết dự án bất động sản: tab **Chính sách bán hàng** + nút **Chia sẻ**, dựng đủ trang theo Figma (header, banner, thanh tab, nội dung, footer). Hai phiên bản giao diện **MUI** (bản chính, ghép API) và **Bootstrap** (UI tĩnh) chạy chung một app.

## Phạm vi (theo Jira)

1. **Nút Chia sẻ** — copy link dự án theo slug kèm tab: `{origin}/{phiên-bản}/du-an/{slug}#chinh-sach-ban-hang`
2. **Hiển thị nội dung chính sách** — text, format chữ (bold, italic, màu, size), ảnh, table, căn lề, list, link
3. **Ghép API** `GET /portal/contents/get` (`refType=PROJECT`, `contentType=POLICY`) — trên bản MUI

## Chạy

Yêu cầu **Node `^20.19` hoặc `>=22.12`** (Vite 7). Node 18 sẽ báo lỗi khi chạy.

```bash
npm install
npm run dev        # http://localhost:5173
```

Không cần file `.env`: mặc định gọi API UAT qua proxy của Vite (UAT chặn CORS từ `localhost`).
Build kiểm tra: `npm run build`, `npm run lint`.

## Hướng dẫn review / test

### Hai phiên bản

| Route | Phiên bản | Dữ liệu |
|---|---|---|
| `/mui/du-an/:slug` | **MUI** — bản chính | API thật UAT |
| `/bootstrap/du-an/:slug` | **Bootstrap** | Tĩnh theo Figma — **luôn hiện dự án mẫu "Vinhomes Ocean Park 3"**, không phụ thuộc slug trên URL |

- Nút **MUI | Bootstrap** ở góc phải dưới để chuyển qua lại, giữ nguyên slug và tab.
- Mở `/` sẽ vào `/mui/du-an/vinhomes-ocean-park-2-3#chinh-sach-ban-hang`.
- Code tách theo route: vào bản nào chỉ tải JS/CSS của bản đó. CSS Bootstrap chỉ nạp khi vào route Bootstrap và gỡ ra khi rời trang, nên không đè lên MUI.

### Cấu trúc thư mục

```
src/
├── pages/mui/              Chỉ bản MUI (dùng @mui/material)
│   ├── ProjectDetailMui.tsx    Tra dự án theo slug → hiển thị
│   └── components/             Header, footer, banner, tab, nút Chia sẻ, PolicyPanel (gọi API)
├── pages/bootstrap/        Chỉ bản Bootstrap (class Bootstrap + bootstrap-page.css)
├── components/
│   ├── PolicyContent.tsx       Hiển thị HTML chính sách — DÙNG CHUNG cho 2 bản
│   └── VersionSwitcher.tsx     Nút chuyển phiên bản
├── styles/policy-content.css   CSS cho nội dung chính sách (dùng chung)
├── api/  types/            Gọi API theo Swagger
├── hooks/                  useRequest (loading/lỗi/thử lại), useHashTab, useSnapCarousel, useBootstrapStylesheet
├── lib/                    projectSlug, sanitizeHtml, share (copy link), routes
├── constants/              Token màu từ Figma, định nghĩa 7 tab
├── data/                   Nội dung header/footer, dữ liệu tĩnh cho bản Bootstrap, HTML mẫu đủ định dạng
└── assets/figma/           Icon, logo, ảnh export từ Figma
```

**Vì sao `PolicyContent` dùng CSS thuần, không dùng MUI/Bootstrap?** Nội dung chính sách là HTML admin nhập từ trình soạn thảo CMS (đã kèm màu, cỡ chữ, căn lề). FE chỉ sanitize rồi hiển thị nguyên định dạng đó, nên hai bản phải hiển thị **giống hệt nhau** — dùng chung một component tránh hai bản lệch nhau. MUI/Bootstrap chỉ quyết định phần khung trang.

### Kịch bản test (bản MUI, dữ liệu UAT)

| # | Mở link | Kết quả mong đợi |
|---|---|---|
| 1 | `/mui/du-an/vinhomes-ocean-park-2-3#chinh-sach-ban-hang` | Vào thẳng tab Chính sách, nội dung là ảnh (giống Figma) |
| 2 | `/mui/du-an/vinhomes-hai-van-bay#chinh-sach-ban-hang` | Tiêu đề căn giữa, cỡ 28px (định dạng admin nhập) + ảnh |
| 3 | `/mui/du-an/vinhomes-global-gate-ha-long#chinh-sach-ban-hang` | "Chính sách bán hàng của dự án đang được cập nhật." (BE trả `data: null`) |
| 4 | `/mui/du-an/ai-vin-can-gio-khu-b#chinh-sach-ban-hang` | Tìm đúng dự án "[AI] Vin Cần giờ khu B" dù tên có ký tự đặc biệt |
| 5 | `/mui/du-an/VINHOMES-HAI-VAN-BAY` | Tự chuyển về slug chuẩn chữ thường |
| 6 | `/mui/du-an/khong-ton-tai` | "Không tìm thấy dự án" |
| 7 | Bấm **Chia sẻ** → dán link vào tab mới | Hiện "Đã sao chép…"; link mở thẳng tab Chính sách bán hàng |
| 8 | Ngắt mạng rồi mở trang | Thông báo lỗi kèm nút **Thử lại** |
| 9 | Thu nhỏ cửa sổ về ~400px | Giao diện mobile theo Figma: nút Chia sẻ full-width, thanh tab cuộn ngang, menu ☰ |

Dữ liệu UAT có thể thay đổi theo thời gian. Các định dạng UAT chưa có (bold, italic, màu, list, link, table) được kiểm tra bằng HTML mẫu `src/data/mockPolicyFormats.ts` — viết theo đúng kiểu HTML trình soạn thảo sinh ra; xem bằng cách tạm render `<PolicyContent html={FORMAT_DEMO_POLICY_HTML} />`.

## API (đã đối chiếu Swagger + gọi thử UAT)

Swagger: https://api-uat.vinhomes.biz.vn/hovixi/api/v1/swagger-ui/index.html

| Điểm | Thực tế BE | FE xử lý |
|---|---|---|
| `data.content` | Chuỗi HTML từ trình soạn thảo CMS | Sanitize (DOMPurify) rồi render, giữ nguyên định dạng của admin |
| `data: null` | Dự án chưa có chính sách (7/10 dự án trên UAT) | Hiện "đang được cập nhật" |
| `fileInfoList` | Trùng với ảnh đã có trong HTML | Bỏ qua |
| Slug dự án | BE **không có** trường slug / API tra theo slug | Slug theo SCRUM-7 (tên không dấu, khoảng trắng → `-`). Tra dự án bằng `GET /portal/projects/search?name=` (không phân biệt dấu), chọn dự án có slug khớp chính xác. Tên có ký tự đặc biệt (`&`, `[AI]`) thử thêm vài cụm từ ngắn hơn |
| Tên, mô tả, banner | Có sẵn trong kết quả `projects/search` | Dùng `name`, `shortDescription`, `fileInfo.fullLink` |
| CORS | UAT chặn `localhost` (403) | Dev đi qua proxy Vite (`vite.config.ts`). Deploy: BE cần mở CORS cho domain FE |

### Nguồn nội dung chính sách

Figma admin (page "Component", node `348:7830` — "Thêm mới phân khu" > tab Chính sách): admin nhập chính sách bằng **trình soạn thảo văn bản** với thanh công cụ: cỡ chữ, màu, B/I/U/S, căn trái/giữa/phải, list số/chấm, chèn ảnh, chèn link — khớp danh sách định dạng trong Jira. Phía người dùng Figma chỉ minh hoạ 1 ảnh poster vì admin chèn ảnh qua trình soạn thảo. → FE render HTML đầy đủ định dạng, không chỉ ảnh.

## Hạn chế đã biết

Phát hiện khi audit, chưa xử lý trong ticket này:

| Vấn đề | Ghi chú |
|---|---|
| Bản MUI giật layout khi tải (CLS cao) | Vùng chính sách trống trong lúc tra dự án; ảnh CMS không có kích thước sẵn (`width/height="100%"`) |
| Bo góc một số khối ở bản MUI lớn hơn Figma | Nút Chia sẻ, thanh tab, banner, bản đồ footer |
| Ở bản Bootstrap, bấm logo/menu/breadcrumb/link footer chuyển sang bản MUI | Các trang ngoài phạm vi đều quay về dự án mặc định của bản MUI |
| Font Google tải chặn render (~0,5s FCP) | |
| Thiếu `meta description`, tiêu đề tab trình duyệt cố định | |
| Chữ tab trên nền gradient đầu xanh ngọc có độ tương phản 2,17:1 (chuẩn AA 4,5:1) | Màu theo đúng Figma — cần designer xem lại |
| Ảnh chính sách trên CDN ~8,4 MB/ảnh (trang ~16,6 MB) | Cần BE nén ảnh khi upload |
| Mở slug không tồn tại mất ~2s (tối đa 8 lần gọi search) | Cần BE thêm API tra dự án theo slug |

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

## Stack

Vite 7 · React 19 · TypeScript · MUI · Bootstrap · React Router · Axios · DOMPurify

## Điểm cần xác nhận với BE/PM

- [x] `/portal/contents/get` dùng **GET**, tham số trên query string
- [x] Shape response — đã sửa `src/types/` theo Swagger
- [x] Slug dự án: theo quy ước SCRUM-7
- [ ] Đề nghị BE thêm API tra dự án theo slug (hiện FE phải tìm theo tên)
- [ ] CORS cho domain deploy
- [ ] Design cho trạng thái loading / rỗng / lỗi (FE đang tự làm)

## Bảo mật

Nội dung trả về là **HTML thô từ CMS** → bắt buộc sanitize bằng DOMPurify trước khi render. Không dùng `dangerouslySetInnerHTML` trần.
