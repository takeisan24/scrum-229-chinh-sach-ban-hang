import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import ProjectDetailMui from './pages/mui/ProjectDetailMui';
import ProjectDetailBootstrap from './pages/bootstrap/ProjectDetailBootstrap';

function Home() {
  return (
    <main style={{ fontFamily: 'system-ui', padding: 32 }}>
      <h1>SCRUM-229 — Tab Chinh sach ban hang</h1>
      <ul>
        <li><Link to="/mui">Ban MUI (ban chinh, co ghep API)</Link></li>
        <li><Link to="/bootstrap">Ban Bootstrap (UI tinh)</Link></li>
      </ul>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mui" element={<ProjectDetailMui />} />
        <Route path="/bootstrap" element={<ProjectDetailBootstrap />} />
      </Routes>
    </BrowserRouter>
  );
}
