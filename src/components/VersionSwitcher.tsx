import { Link, useLocation } from 'react-router-dom';
import { BRAND_GRADIENT, colors } from '../constants/designTokens';
import { UI_VERSIONS, type UiVersion } from '../lib/routes';

/**
 * Nut noi chuyen qua lai ban MUI / Bootstrap, giu nguyen slug va tab (hash).
 * Style inline vi dung chung cho ca hai ban, khong phu thuoc thu vien UI.
 */
export default function VersionSwitcher() {
  const { pathname, hash } = useLocation();
  const [, current, ...rest] = pathname.split('/');
  if (!UI_VERSIONS.some((v) => v.id === current)) return null;

  return (
    <nav
      aria-label="Chọn phiên bản giao diện"
      style={{
        position: 'fixed',
        right: 16,
        bottom: 16,
        zIndex: 2000,
        display: 'flex',
        gap: 4,
        padding: 4,
        borderRadius: 999,
        background: colors.white,
        boxShadow: '0 4px 16px rgba(42, 82, 190, 0.25)',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {UI_VERSIONS.map(({ id, label }) => {
        const active = id === (current as UiVersion);
        return (
          <Link
            key={id}
            to={{ pathname: ['', id, ...rest].join('/'), hash }}
            aria-current={active ? 'page' : undefined}
            style={{
              padding: '6px 14px',
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none',
              color: active ? colors.white : colors.primary,
              background: active ? BRAND_GRADIENT : 'transparent',
            }}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
