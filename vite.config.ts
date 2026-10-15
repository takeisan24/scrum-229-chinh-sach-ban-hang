import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// API UAT chan CORS tu localhost (tra 403 voi Origin http://localhost) -> dev di qua proxy,
// doi Origin thanh chinh domain API (UAT chap nhan, da kiem tra).
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
