import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { getProjectPolicy } from '../../../api/contents';
import { useRequest } from '../../../hooks/useRequest';
import PolicyContent from '../../../components/PolicyContent';

interface PolicyPanelProps {
  projectId: number;
}

/** Khung cho noi dung chinh sach — hien ca luc dang tra du an de vung nay khong trong (tranh giat layout). */
export function PolicySkeleton() {
  return (
    // minHeight 100vh khop voi .policy-content.is-loading-media: footer o ngoai man hinh tu dau den khi anh tai xong
    <Box aria-busy="true" aria-label="Đang tải chính sách bán hàng" sx={{ maxWidth: 1200, mx: 'auto', minHeight: '100vh' }}>
      <Skeleton variant="rounded" sx={{ width: '100%', height: 'auto', aspectRatio: '1200 / 1265' }} />
    </Box>
  );
}

/** Tai va hien chinh sach ban hang. `data: null` (du an chua co chinh sach) -> PolicyContent hien thong bao rong. */
export default function PolicyPanel({ projectId }: PolicyPanelProps) {
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

  return <PolicyContent html={state.data?.content ?? ''} />;
}
