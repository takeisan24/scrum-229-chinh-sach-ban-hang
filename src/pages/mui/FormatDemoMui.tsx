import { Link as RouterLink } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Link from '@mui/material/Link';
import { POLICY_TAB_ID } from '../../constants/projectTabs';
import { FORMAT_DEMO_POLICY_HTML, FORMAT_DEMO_PROJECT } from '../../data/mockPolicyFormats';
import PageShell from './components/PageShell';
import PolicyContent from './components/PolicyContent';
import ProjectView from './components/ProjectView';

/**
 * Trang demo dinh dang — DU LIEU GIA (src/data/mockPolicyFormats.ts), khong goi API.
 * Dung chung ProjectView + PolicyContent voi trang that nen hien thi y het khi BE tra HTML tuong tu.
 */
export default function FormatDemoMui() {
  return (
    <PageShell>
      <ProjectView
        project={FORMAT_DEMO_PROJECT}
        defaultTab={POLICY_TAB_ID}
        notice={
          <Alert severity="warning" variant="outlined">
            <AlertTitle>Trang demo — dữ liệu giả, không lấy từ API</AlertTitle>
            Nội dung chính sách bên dưới viết theo đúng kiểu HTML của trình soạn thảo CMS, dùng để kiểm tra hiển thị đủ
            các định dạng (in đậm, nghiêng, màu, cỡ chữ, căn lề, danh sách, liên kết, bảng, ảnh). Dữ liệu thật trên UAT
            hiện mới chỉ có ảnh — xem trang dự án thật tại{' '}
            <Link component={RouterLink} to="/du-an/65#chinh-sach-ban-hang">Vinhomes Ocean Park 2 &amp; 3</Link>.
          </Alert>
        }
        renderPolicy={() => <PolicyContent html={FORMAT_DEMO_POLICY_HTML} />}
      />
    </PageShell>
  );
}
