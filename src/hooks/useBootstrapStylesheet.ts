import { useEffect, useState } from 'react';
import bootstrapCssUrl from 'bootstrap/dist/css/bootstrap.min.css?url';

/**
 * Nạp CSS Bootstrap chỉ khi đang ở trang Bootstrap và gỡ ra khi rời trang,
 * để reset/utility của Bootstrap không đè lên bản MUI (hai bản chung một app).
 * Trả về true khi CSS đã tải xong — trang chờ trước khi render để không nháy giao diện.
 */
export function useBootstrapStylesheet(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = bootstrapCssUrl;
    link.onload = () => setReady(true);
    // Tải lỗi: vẫn render (thiếu style Bootstrap) thay vì để trang trắng mãi
    link.onerror = () => setReady(true);
    document.head.appendChild(link);
    return () => link.remove();
  }, []);

  return ready;
}
