import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import VersionSwitcher from './components/VersionSwitcher';
import { defaultProjectPath } from './lib/routes';

// Tách code theo phiên bản: vào bản nào chỉ tải code (và CSS) của bản đó — MUI không tải Bootstrap và ngược lại.
const ProjectDetailMui = lazy(() => import('./pages/mui/ProjectDetailMui'));
const ProjectDetailBootstrap = lazy(() => import('./pages/bootstrap/ProjectDetailBootstrap'));

/**
 * Hai bản giao diện song song:
 * - /mui/du-an/:slug — bản chính, dữ liệu thật từ API
 * - /bootstrap/du-an/:slug — UI tĩnh theo Figma
 */
export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/mui/du-an/:slug" element={<ProjectDetailMui />} />
          <Route path="/bootstrap/du-an/:slug" element={<ProjectDetailBootstrap />} />
          {/* Các trang khác (Giới thiệu, Tin tức...) ngoài phạm vi -> về dự án mặc định, GIỮ NGUYÊN phiên bản */}
          <Route path="/bootstrap/*" element={<Navigate to={defaultProjectPath('bootstrap')} replace />} />
          <Route path="*" element={<Navigate to={defaultProjectPath('mui')} replace />} />
        </Routes>
      </Suspense>
      <VersionSwitcher />
    </BrowserRouter>
  );
}
