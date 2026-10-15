# SCRUM-229 — Tab "Chính sách bán hàng"

Trang chi tiết dự án bất động sản: tab **Chính sách bán hàng** + nút **Chia sẻ**.

## Phạm vi

1. **Nút Chia sẻ** — copy link dự án kèm anchor tab: `{origin}/du-an/{slug}#chinh-sach-ban-hang`
2. **Hiển thị nội dung chính sách** — render rich content từ CMS, phải support:
   - Text + format: bold, italic, màu, size
   - Ảnh, table
   - Căn lề, list, link
3. **Ghép API** `/portal/contents/get`

```json
{ "refId": "<projectId>", "refType": "PROJECT", "contentType": "POLICY" }
```

## Hai bản UI

| Route | Thư viện | Ghép API |
|---|---|---|
| `/mui` | MUI | ✅ bản chính |
| `/bootstrap` | Bootstrap | ❌ UI tĩnh |

## Estimate

| Hạng mục | Giờ |
|---|---|
| Dựng UI bằng MUI | 4h |
| Dựng lại bằng Bootstrap | 4h |
| Ghép API vào bản MUI | 3h |
| **Tổng** | **11h** |

## Chạy

```bash
npm install
cp .env.example .env   # điền VITE_API_BASE_URL
npm run dev
```

## Stack

Vite · React 19 · TypeScript · MUI · Bootstrap · React Router · Axios · DOMPurify

## Điểm cần xác nhận với BE/PM

- [ ] `VITE_API_BASE_URL` — URL thật
- [ ] `/portal/contents/get` dùng **GET hay POST**
- [ ] Shape response thật (`src/types/content.ts` đang là phỏng đoán)
- [ ] Tab chuyển bằng hash `#` hay route riêng
- [ ] Design cho trạng thái loading / rỗng / lỗi

## Bảo mật

Nội dung trả về là **HTML thô từ CMS** → bắt buộc sanitize bằng DOMPurify trước khi render. Không dùng `dangerouslySetInnerHTML` trần.
