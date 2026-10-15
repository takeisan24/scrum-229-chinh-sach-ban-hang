import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProjectDetailMui from './pages/mui/ProjectDetailMui';

/** Du an mac dinh khi demo: VINHOMES OCEAN PARK 2 & 3 tren UAT (dung du an trong Figma). Trang tu doi sang slug chuan. */
const DEFAULT_PROJECT_PATH = '/du-an/65#chinh-sach-ban-hang';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/du-an/:slug" element={<ProjectDetailMui />} />
        {/* Cac trang khac (Gioi thieu, Tin tuc...) ngoai pham vi -> ve du an mac dinh */}
        <Route path="*" element={<Navigate to={DEFAULT_PROJECT_PATH} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
