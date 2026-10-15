import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import iconExternalLink from '../../../assets/figma/icon-external-link.svg';
import { BRAND_GRADIENT, colors } from '../../../constants/designTokens';
import { buildPolicyShareUrl, copyToClipboard } from '../../../lib/share';

type CopyStatus = 'idle' | 'success' | 'error';

export default function ShareButton() {
  const [status, setStatus] = useState<CopyStatus>('idle');

  const handleClick = async () => {
    const ok = await copyToClipboard(buildPolicyShareUrl());
    setStatus(ok ? 'success' : 'error');
  };

  const handleClose = (_event?: unknown, reason?: string) => {
    if (reason === 'clickaway') return;
    setStatus('idle');
  };

  return (
    <>
      <Button
        variant="contained"
        disableElevation
        startIcon={<img src={iconExternalLink} alt="" width={24} height={24} />}
        onClick={handleClick}
        sx={{
          width: { xs: '100%', md: 'auto' },
          flexShrink: 0,
          px: 3,
          py: { xs: 1, md: '13px' },
          borderRadius: '8px',
          background: BRAND_GRADIENT,
          color: colors.primary100,
          fontSize: 15,
          lineHeight: 'normal',
          '& .MuiButton-startIcon': { mr: 1, ml: 0 },
          '&:hover': { background: BRAND_GRADIENT, filter: 'brightness(0.95)' },
        }}
      >
        Chia sẻ
      </Button>

      <Snackbar
        open={status !== 'idle'}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={status === 'error' ? 'error' : 'success'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {status === 'error'
            ? 'Không sao chép được liên kết, vui lòng thử lại'
            : 'Đã sao chép liên kết chính sách bán hàng'}
        </Alert>
      </Snackbar>
    </>
  );
}
