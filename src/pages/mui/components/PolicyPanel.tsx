import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { getProjectPolicy } from '../../../api/contents';
import { useRequest } from '../../../hooks/useRequest';
import PolicyContent from './PolicyContent';

interface PolicyPanelProps {
  projectId: number;
}

/** Tai va hien chinh sach ban hang. `data: null` (du an chua co chinh sach) -> PolicyContent hien thong bao rong. */
export default function PolicyPanel({ projectId }: PolicyPanelProps) {
  const [state, retry] = useRequest(projectId, (signal) => getProjectPolicy(projectId, signal));

  if (state.status === 'loading') {
    return (
      <Box aria-busy="true" aria-label="Đang tải chính sách bán hàng" sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Skeleton variant="rounded" sx={{ width: '100%', height: 'auto', aspectRatio: '1200 / 1265' }} />
      </Box>
    );
  }

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
