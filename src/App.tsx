import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProjectDetailMui from './pages/mui/ProjectDetailMui';
import { MOCK_PROJECT } from './data/mockProject';

const PROJECT_PATH = `/du-an/${MOCK_PROJECT.slug}`;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/du-an/:slug" element={<ProjectDetailMui />} />
        {/* Cac trang khac (Gioi thieu, Tin tuc...) ngoai pham vi -> ve trang du an mau */}
        <Route path="*" element={<Navigate to={PROJECT_PATH} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
