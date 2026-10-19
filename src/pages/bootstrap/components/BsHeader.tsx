import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import iconMenu from '../../../assets/figma/icon-menu-alt-01.svg';
import iconUser from '../../../assets/figma/icon-user-01.svg';
import logo from '../../../assets/figma/logo.svg';
import onlineDot from '../../../assets/figma/online-dot.svg';
import { MAIN_NAV, ONLINE_COUNT } from '../../../data/site';
import { versionPath } from '../../../lib/routes';

const MENU_ID = 'bs-mobile-menu';

/** Header: menu giữa trên web, offcanvas Bootstrap trên mobile (điều khiển bằng React, không cần bootstrap.js). */
export default function BsHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Hành vi dialog như Drawer bên MUI: Esc để đóng, focus vào menu và giữ trong menu,
  // khoá cuộn trang phía sau, đóng thì trả focus về nút mở menu.
  useEffect(() => {
    if (!menuOpen) return;
    const panel = panelRef.current;
    const menuButton = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !panel) return;
      const focusable = [...panel.querySelectorAll<HTMLElement>('a[href], button')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      menuButton?.focus();
    };
  }, [menuOpen]);

  return (
    <>
      <header className="bs-header d-flex align-items-center px-3 px-md-4">
        {/* flex-fill hai bên để menu giữa luôn nằm chính giữa header */}
        <div className="flex-fill d-flex">
          <Link to={versionPath('bootstrap', '/')} aria-label="Trang chủ" className="d-flex">
            <img src={logo} alt="" width={46} height={46} />
          </Link>
        </div>

        <nav className="d-none d-md-flex gap-4">
          {MAIN_NAV.map((item) => (
            <Link key={item.href} to={versionPath('bootstrap', item.href)} className="bs-nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex-fill d-flex justify-content-end align-items-center gap-3 gap-md-4">
          <div className="d-flex align-items-center gap-1">
            <img src={onlineDot} alt="" width={20} height={20} />
            <span className="bs-online text-nowrap">{ONLINE_COUNT} người đang Online</span>
          </div>
          <div className="bs-avatar d-none d-md-flex" role="img" aria-label="Tài khoản">
            <img src={iconUser} alt="" width={24} height={24} />
          </div>
          <button
            ref={menuButtonRef}
            type="button"
            className="btn p-0 border-0 d-md-none"
            aria-label="Mở menu"
            aria-expanded={menuOpen}
            aria-controls={MENU_ID}
            onClick={() => setMenuOpen(true)}
          >
            <img src={iconMenu} alt="" width={24} height={24} />
          </button>
        </div>
      </header>

      {/* Offcanvas phải nằm NGOÀI header: header có backdrop-filter nên là khung chứa của phần tử fixed */}
      <div
        ref={panelRef}
        id={MENU_ID}
        className={`offcanvas offcanvas-end${menuOpen ? ' show' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        tabIndex={-1}
        style={{ visibility: menuOpen ? 'visible' : 'hidden', width: 260 }}
      >
        <div className="offcanvas-header">
          <button
            ref={closeRef}
            type="button"
            className="btn-close ms-auto"
            aria-label="Đóng"
            onClick={() => setMenuOpen(false)}
          />
        </div>
        <nav className="offcanvas-body d-flex flex-column gap-3">
          {MAIN_NAV.map((item) => (
            <Link key={item.href} to={versionPath('bootstrap', item.href)} className="bs-nav-link" onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      {menuOpen && <div className="offcanvas-backdrop fade show" onClick={() => setMenuOpen(false)} />}
    </>
  );
}
