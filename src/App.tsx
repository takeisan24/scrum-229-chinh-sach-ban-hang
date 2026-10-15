import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import VersionSwitcher from './components/VersionSwitcher';
import { defaultProjectPath } from './lib/routes';

// Tach code theo phien ban: vao ban nao chi tai code (va CSS) cua ban do — MUI khong tai Bootstrap va nguoc lai.
const ProjectDetailMui = lazy(() => import('./pages/mui/ProjectDetailMui'));
const ProjectDetailBootstrap = lazy(() => import('./pages/bootstrap/ProjectDetailBootstrap'));

/**
 * Hai ban giao dien song song:
 * - /mui/du-an/:slug — ban chinh, du lieu that tu API
 * - /bootstrap/du-an/:slug — UI tinh theo Figma
 */
export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/mui/du-an/:slug" element={<ProjectDetailMui />} />
          <Route path="/bootstrap/du-an/:slug" element={<ProjectDetailBootstrap />} />
          {/* Cac trang khac (Gioi thieu, Tin tuc...) ngoai pham vi -> ve du an mac dinh, GIU NGUYEN phien ban */}
          <Route path="/bootstrap/*" element={<Navigate to={defaultProjectPath('bootstrap')} replace />} />
          <Route path="*" element={<Navigate to={defaultProjectPath('mui')} replace />} />
        </Routes>
      </Suspense>
      <VersionSwitcher />
    </BrowserRouter>
  );
}
