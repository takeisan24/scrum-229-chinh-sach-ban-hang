import { useEffect, useState } from 'react';
import bootstrapCssUrl from 'bootstrap/dist/css/bootstrap.min.css?url';

/**
 * Nap CSS Bootstrap chi khi dang o trang Bootstrap va go ra khi roi trang,
 * de reset/utility cua Bootstrap khong de len ban MUI (hai ban chung mot app).
 * Tra ve true khi CSS da tai xong — trang cho truoc khi render de khong nhay giao dien.
 */
export function useBootstrapStylesheet(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = bootstrapCssUrl;
    link.onload = () => setReady(true);
    // Tai loi: van render (thieu style Bootstrap) thay vi de trang trang mai
    link.onerror = () => setReady(true);
    document.head.appendChild(link);
    return () => link.remove();
  }, []);

  return ready;
}
