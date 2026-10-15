import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import footerMap from '../../../assets/figma/footer-map.png';
import logoFooter from '../../../assets/figma/logo-footer.svg';
import { BRAND_GRADIENT, colors } from '../../../constants/designTokens';
import {
  COPYRIGHT,
  FOOTER_CATEGORIES,
  FOOTER_CONTACTS,
  FOOTER_MAP_URL,
  FOOTER_TAGLINE,
  SOCIAL_LINKS,
} from '../../../data/site';

const headingSx = { fontSize: 18, fontWeight: 600, color: colors.primary100, mb: 2 } as const;

export default function SiteFooter() {
  return (
    <Box
      component="footer"
      sx={{
        background: BRAND_GRADIENT,
        color: colors.white,
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          gap: { xs: 4, md: 3 },
        }}
      >
        {/* Cot 1: logo, slogan, lien he */}
        <Box sx={{ width: { md: 373 }, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <img src={logoFooter} alt="" width={40} height={40} />
          <Typography sx={{ fontSize: { xs: 15, md: 17 }, fontWeight: 600, lineHeight: '26px', color: colors.grey100 }}>
            {FOOTER_TAGLINE}
          </Typography>
          <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {FOOTER_CONTACTS.map((item) => (
              <Box component="li" key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <img src={item.icon} alt="" width={24} height={24} style={{ flexShrink: 0 }} />
                <Link
                  href={item.href}
                  underline="hover"
                  {...(item.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                  sx={{ color: colors.white, fontSize: 13, fontWeight: 500, lineHeight: '21px' }}
                >
                  {item.label}
                </Link>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Cot 2: danh muc + mang xa hoi */}
        <Box sx={{ width: { md: 280 }, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: { xs: 2, md: 4 } }}>
          <Box>
            <Typography sx={headingSx}>Danh mục</Typography>
            <Box component="ul" sx={{ m: 0, pl: '22.5px', display: 'flex', flexDirection: 'column', gap: 1 }}>
              {FOOTER_CATEGORIES.map((item) => (
                <li key={item.href}>
                  <Link
                    component={RouterLink}
                    to={item.href}
                    underline="hover"
                    sx={{ color: colors.white, fontSize: 15, fontWeight: 500 }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </Box>
          </Box>
          <Box>
            <Typography sx={headingSx}>Kết nối</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {SOCIAL_LINKS.map((item) => (
                <Link key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label} sx={{ display: 'flex' }}>
                  <img src={item.icon} alt="" width={24} height={24} />
                </Link>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Cot 3: ban do — bam mo Google Maps */}
        <Link
          href={FOOTER_MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Xem bản đồ"
          // Figma: khung ban do 380x234 (web) / full x 234 (mobile) — anh goc vuong nen phai co dinh chieu cao
          sx={{ display: 'block', width: { xs: '100%', md: 380 }, height: 234, flexShrink: 0 }}
        >
          <Box
            component="img"
            src={footerMap}
            alt=""
            sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 2, display: 'block' }}
          />
        </Link>
      </Box>

      <Box sx={{ borderTop: `1px solid ${colors.primary100}`, pt: 2 }}>
        <Typography
          sx={{
            fontSize: { xs: 15, md: 18 },
            fontWeight: 600,
            lineHeight: '26px',
            color: colors.white,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          {COPYRIGHT}
        </Typography>
      </Box>
    </Box>
  );
}
