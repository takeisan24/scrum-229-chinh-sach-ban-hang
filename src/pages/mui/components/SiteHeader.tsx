import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import iconMenu from '../../../assets/figma/icon-menu-alt-01.svg';
import iconUser from '../../../assets/figma/icon-user-01.svg';
import logo from '../../../assets/figma/logo.svg';
import onlineDot from '../../../assets/figma/online-dot.svg';
import { BRAND_GRADIENT, HEADER_SHADOW, colors } from '../../../constants/designTokens';
import { MAIN_NAV, ONLINE_COUNT } from '../../../data/site';

/** Chieu cao header — dung lam scroll-margin de tab khong bi header sticky che. */
export const HEADER_HEIGHT = 70;

const navLinkSx = {
  color: colors.grey400,
  fontSize: 17,
  fontWeight: 500,
  lineHeight: '25px',
  textTransform: 'uppercase',
  '&:hover': { color: colors.primary },
} as const;

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 'appBar',
        height: HEADER_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        px: { xs: 2, md: 3 },
        bgcolor: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(6.55px)',
        borderBottom: `1px solid ${colors.grey100}`,
        boxShadow: HEADER_SHADOW,
      }}
    >
      {/* flex: 1 hai ben de menu giua luon nam chinh giua header */}
      <Box sx={{ flex: 1, display: 'flex' }}>
        <RouterLink to="/" aria-label="Trang chủ" style={{ display: 'flex' }}>
          <img src={logo} alt="" width={46} height={46} />
        </RouterLink>
      </Box>

      <Box component="nav" sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
        {MAIN_NAV.map((item) => (
          <Link key={item.href} component={RouterLink} to={item.href} underline="none" sx={navLinkSx}>
            {item.label}
          </Link>
        ))}
      </Box>

      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: { xs: 2, md: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <img src={onlineDot} alt="" width={20} height={20} />
          <Typography sx={{ fontSize: 13, fontWeight: 500, color: colors.grey600, whiteSpace: 'nowrap' }}>
            {ONLINE_COUNT} người đang Online
          </Typography>
        </Box>

        <Box
          aria-label="Tài khoản"
          role="img"
          sx={{
            display: { xs: 'none', md: 'flex' },
            p: '11px',
            borderRadius: '32px',
            background: BRAND_GRADIENT,
          }}
        >
          <img src={iconUser} alt="" width={24} height={24} />
        </Box>

        <IconButton
          aria-label="Mở menu"
          onClick={() => setMenuOpen(true)}
          sx={{ display: { xs: 'inline-flex', md: 'none' }, p: 0 }}
        >
          <img src={iconMenu} alt="" width={24} height={24} />
        </IconButton>
      </Box>

      <Drawer anchor="right" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <Box component="nav" sx={{ width: 260, p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              component={RouterLink}
              to={item.href}
              underline="none"
              onClick={() => setMenuOpen(false)}
              sx={navLinkSx}
            >
              {item.label}
            </Link>
          ))}
        </Box>
      </Drawer>
    </Box>
  );
}
