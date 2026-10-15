import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import VersionSwitcher from './components/VersionSwitcher';
import { POLICY_TAB_ID } from './constants/projectTabs';
import { DEFAULT_PROJECT_SLUG, projectPath } from './lib/routes';
import ProjectDetailBootstrap from './pages/bootstrap/ProjectDetailBootstrap';
import ProjectDetailMui from './pages/mui/ProjectDetailMui';

/**
 * Hai ban giao dien song song:
 * - /mui/du-an/:slug — ban chinh, du lieu that tu API
 * - /bootstrap/du-an/:slug — UI tinh theo Figma
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/mui/du-an/:slug" element={<ProjectDetailMui />} />
        <Route path="/bootstrap/du-an/:slug" element={<ProjectDetailBootstrap />} />
        {/* Cac trang khac (Gioi thieu, Tin tuc...) ngoai pham vi -> ve du an mac dinh, tab chinh sach */}
        <Route
          path="*"
          element={<Navigate to={`${projectPath('mui', DEFAULT_PROJECT_SLUG)}#${POLICY_TAB_ID}`} replace />}
        />
      </Routes>
      <VersionSwitcher />
    </BrowserRouter>
  );
}
