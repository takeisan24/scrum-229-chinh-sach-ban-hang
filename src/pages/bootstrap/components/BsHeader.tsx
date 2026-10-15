import { useState } from 'react';
import { Link } from 'react-router-dom';
import iconMenu from '../../../assets/figma/icon-menu-alt-01.svg';
import iconUser from '../../../assets/figma/icon-user-01.svg';
import logo from '../../../assets/figma/logo.svg';
import onlineDot from '../../../assets/figma/online-dot.svg';
import { MAIN_NAV, ONLINE_COUNT } from '../../../data/site';
import { versionPath } from '../../../lib/routes';

/** Header: menu giua tren web, offcanvas Bootstrap tren mobile (dieu khien bang React, khong can bootstrap.js). */
export default function BsHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="bs-header d-flex align-items-center px-3 px-md-4">
        {/* flex-fill hai ben de menu giua luon nam chinh giua header */}
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
            type="button"
            className="btn p-0 border-0 d-md-none"
            aria-label="Mở menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <img src={iconMenu} alt="" width={24} height={24} />
          </button>
        </div>
      </header>

      {/* Offcanvas phai nam NGOAI header: header co backdrop-filter nen la khung chua cua phan tu fixed */}
      <div
        className={`offcanvas offcanvas-end${menuOpen ? ' show' : ''}`}
        tabIndex={-1}
        aria-label="Menu"
        style={{ visibility: menuOpen ? 'visible' : 'hidden', width: 260 }}
      >
        <div className="offcanvas-header">
          <button type="button" className="btn-close ms-auto" aria-label="Đóng" onClick={() => setMenuOpen(false)} />
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
