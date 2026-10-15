import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import { TABLE_WRAPPER_CLASS, sanitizeHtml } from '../../../lib/sanitizeHtml';

/**
 * Style cho HTML tu CMS. Khong dat mau/size/can le o day de khong de len
 * style inline cua CMS — chi chan nhung thu lam vo layout (anh, table tran ngang).
 */
const richContentSx: SxProps<Theme> = {
  // Figma: vung noi dung rong 1200px, can giua trong khung 1392px
  maxWidth: 1200,
  mx: 'auto',
  color: 'text.primary',
  fontSize: 16,
  lineHeight: 1.7,
  // overflow-wrap (khong dung word-break): van ngat link/chu qua dai, nhung khong lam table bi ep
  // hep toi muc bẻ tung ky tu — table rong se cuon ngang trong khung boc.
  overflowWrap: 'break-word',
  '& > :first-of-type': { mt: 0 },
  '& p': { my: 1.5 },
  '& h1, & h2, & h3, & h4': { mt: 3, mb: 1.5, lineHeight: 1.3 },
  '& img': { maxWidth: '100%', height: 'auto !important', borderRadius: 1 },
  '& ul, & ol': { pl: 3, my: 1.5 },
  '& li + li': { mt: 0.5 },
  '& a': { color: 'primary.main', textDecoration: 'underline' },
  // sanitizeHtml boc moi table trong khung nay: table rong hon man hinh cuon ngang thay vi day vo trang
  [`& .${TABLE_WRAPPER_CLASS}`]: { maxWidth: '100%', overflowX: 'auto', my: 2 },
  '& table': { borderCollapse: 'collapse' },
  '& th, & td': {
    border: '1px solid',
    borderColor: 'divider',
    px: 1.5,
    py: 1,
    verticalAlign: 'top',
  },
  '& th': { bgcolor: 'grey.100', fontWeight: 600, textAlign: 'left' },
};

interface PolicyContentProps {
  html: string;
}

export default function PolicyContent({ html }: PolicyContentProps) {
  const safeHtml = useMemo(() => sanitizeHtml(html), [html]);

  if (!safeHtml.trim()) {
    return (
      <Typography color="text.secondary" sx={{ py: 6, textAlign: 'center' }}>
        Chính sách bán hàng của dự án đang được cập nhật.
      </Typography>
    );
  }

  return <Box sx={richContentSx} dangerouslySetInnerHTML={{ __html: safeHtml }} />;
}
