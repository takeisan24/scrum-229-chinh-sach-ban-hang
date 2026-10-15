# SCRUM-229 — Tab "Chính sách bán hàng"

Trang chi tiết dự án bất động sản: tab **Chính sách bán hàng** + nút **Chia sẻ**, dựng đủ trang theo Figma (header, banner, thanh tab, nội dung, footer).

## Phạm vi

1. **Nút Chia sẻ** — copy link trang dự án hiện tại (theo slug) kèm anchor tab: `{origin}/du-an/{slug}#chinh-sach-ban-hang`
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
| Slug dự án | BE **không có** trường slug | FE tự tạo `{ten-khong-dau}-{id}`, vd `/du-an/vinhomes-ocean-park-2-3-65` |
| Tên, mô tả, banner | `GET /portal/projects/detail?id=` | Dùng `name`, `shortDescription`, `fileInfo.fullLink` |
| Không tìm thấy | HTTP 404 + `code: RESOURCE_NOT_FOUND` | Gom về `ApiError`, hiện "Không tìm thấy dự án" |
| CORS | UAT chặn `localhost` (403) | Dev đi qua proxy Vite (`vite.config.ts`). Deploy: BE cần mở CORS cho domain FE |

### Nguồn nội dung chính sách

Figma admin (page "Component", node `348:7830` — "Thêm mới phân khu" > tab Chính sách): admin nhập chính sách bằng **trình soạn thảo văn bản** với thanh công cụ: cỡ chữ, màu, B/I/U/S, căn trái/giữa/phải, list số/chấm, chèn ảnh, chèn link — khớp danh sách định dạng trong Jira. Phía người dùng Figma chỉ minh hoạ 1 ảnh poster vì admin chèn ảnh qua trình soạn thảo. → FE render HTML đầy đủ định dạng, không chỉ ảnh.

Lưu ý gửi BE: ảnh chính sách trên CDN nặng ~8,4 MB/ảnh; dự án 7 nhúng ảnh base64 vào HTML (~800 KB JSON).

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
| `src/data/mockProject.ts` | Dữ liệu tĩnh theo Figma (ảnh poster) — cho bản UI tĩnh |
| `src/data/mockPolicyFormats.ts` | HTML mẫu đủ định dạng theo thanh công cụ admin — dữ liệu test, không hiển thị cho người dùng |
| `src/lib/share.ts` | Tạo link chia sẻ + copy clipboard (có fallback cho HTTP) |
| `src/lib/sanitizeHtml.ts` | Sanitize HTML CMS bằng DOMPurify |
| `src/api/`, `src/types/` | Gọi API theo đúng Swagger, gom lỗi BE về `ApiError` |
| `src/hooks/useRequest.ts` | Gọi API kèm trạng thái loading/lỗi/thử lại, huỷ request cũ |
| `src/lib/projectSlug.ts` | Tạo slug dự án `{ten-khong-dau}-{id}` và tách id từ slug |

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
cp .env.example .env   # tuy chon — mac dinh da tro qua proxy UAT
npm run dev
```

## Stack

Vite · React 19 · TypeScript · React Router · Axios · DOMPurify — cộng MUI hoặc Bootstrap tùy branch.

## Điểm cần xác nhận với BE/PM

- [x] `VITE_API_BASE_URL` — UAT `https://api-uat.vinhomes.biz.vn/hovixi/api/v1` (dev dùng proxy `/hovixi/api/v1`)
- [x] `/portal/contents/get` dùng **GET**, tham số trên query string
- [x] Shape response — đã sửa `src/types/` theo Swagger
- [ ] Slug dự án: FE đang tự tạo — cần xác nhận khớp với URL trang thật
- [ ] CORS cho domain deploy
- [ ] Design cho trạng thái loading / rỗng / lỗi (FE đang tự làm)

## Bảo mật

Nội dung trả về là **HTML thô từ CMS** → bắt buộc sanitize bằng DOMPurify trước khi render. Không dùng `dangerouslySetInnerHTML` trần.
