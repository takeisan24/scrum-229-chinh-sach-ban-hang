import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { getProjectPolicy } from '../../../api/contents';
import { useRequest } from '../../../hooks/useRequest';
import PolicyContent from '../../../components/PolicyContent';

interface PolicyPanelProps {
  projectId: number;
  projectName: string;
}

/** Khung chờ nội dung chính sách — hiện cả lúc đang tra dự án để vùng này không trống (tránh giật layout). */
export function PolicySkeleton() {
  return (
    // minHeight 100vh khớp với .policy-content.is-loading-media: footer ở ngoài màn hình từ đầu đến khi ảnh tải xong
    <Box aria-busy="true" aria-label="Đang tải chính sách bán hàng" sx={{ maxWidth: 1200, mx: 'auto', minHeight: '100vh' }}>
      <Skeleton variant="rounded" sx={{ width: '100%', height: 'auto', aspectRatio: '1200 / 1265' }} />
    </Box>
  );
}

/** Tải và hiện chính sách bán hàng. `data: null` (dự án chưa có chính sách) -> PolicyContent hiện thông báo rỗng. */
export default function PolicyPanel({ projectId, projectName }: PolicyPanelProps) {
  const [state, retry] = useRequest(projectId, (signal) => getProjectPolicy(projectId, signal));

  if (state.status === 'loading') return <PolicySkeleton />;

  if (state.status === 'error') {
    return (
      <Alert
        severity="error"
        action={<Button color="inherit" size="small" onClick={retry}>Thử lại</Button>}
        sx={{ maxWidth: 1200, mx: 'auto' }}
      >
        Không tải được chính sách bán hàng. Vui lòng thử lại.
      </Alert>
    );
  }

  return <PolicyContent html={state.data?.content ?? ''} imageAlt={`Chính sách bán hàng – ${projectName}`} />;
}
