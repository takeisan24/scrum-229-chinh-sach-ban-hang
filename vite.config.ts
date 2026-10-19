import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// API UAT chặn CORS từ localhost (trả 403 với Origin http://localhost) -> khi dev đi qua proxy,
// đổi Origin thành chính domain API (UAT chấp nhận, đã kiểm tra).
const API_TARGET = 'https://api-uat.vinhomes.biz.vn'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/hovixi': {
        target: API_TARGET,
        changeOrigin: true,
        headers: { origin: API_TARGET },
      },
    },
  },
})
