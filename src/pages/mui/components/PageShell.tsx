import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { muiTheme } from '../theme';
import SiteFooter from './SiteFooter';
import SiteHeader from './SiteHeader';

/** Khung trang theo Figma: header + vung noi dung (toi da 1440px, le 24/16px) + footer. */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <SiteHeader />
      <Box
        component="main"
        sx={{
          maxWidth: 1440,
          mx: 'auto',
          px: { xs: 2, md: 3 },
          pt: 2,
          pb: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 3, md: 4 },
        }}
      >
        {children}
      </Box>
      <SiteFooter />
    </ThemeProvider>
  );
}
