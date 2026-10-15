import { Link } from 'react-router-dom';
import footerMap from '../../../assets/figma/footer-map.png';
import logoFooter from '../../../assets/figma/logo-footer.svg';
import {
  COPYRIGHT,
  FOOTER_CATEGORIES,
  FOOTER_CONTACTS,
  FOOTER_MAP_URL,
  FOOTER_TAGLINE,
  SOCIAL_LINKS,
} from '../../../data/site';
import { versionPath } from '../../../lib/routes';

export default function BsFooter() {
  return (
    <footer className="bs-footer">
      <div className="d-flex flex-column flex-md-row justify-content-between gap-4 gap-md-3">
        {/* Cot 1: logo, slogan, lien he */}
        <div className="bs-footer-col-1 d-flex flex-column gap-3">
          <img src={logoFooter} alt="" width={40} height={40} />
          <p className="bs-tagline">{FOOTER_TAGLINE}</p>
          <ul className="list-unstyled m-0 d-flex flex-column gap-2">
            {FOOTER_CONTACTS.map((item) => (
              <li key={item.label} className="d-flex align-items-center gap-2 bs-contact">
                <img src={item.icon} alt="" width={24} height={24} className="flex-shrink-0" />
                <a href={item.href} {...(item.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Cot 2: danh muc + mang xa hoi */}
        <div className="bs-footer-col-2 d-flex flex-column justify-content-center gap-3 gap-md-4">
          <div>
            <p className="bs-footer-heading">Danh mục</p>
            <ul className="bs-footer-list">
              {FOOTER_CATEGORIES.map((item) => (
                <li key={item.href}>
                  <Link to={versionPath('bootstrap', item.href)}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="bs-footer-heading">Kết nối</p>
            <div className="d-flex gap-3">
              {SOCIAL_LINKS.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label} className="d-flex">
                  <img src={item.icon} alt="" width={24} height={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Cot 3: ban do — bam mo Google Maps */}
        <a href={FOOTER_MAP_URL} target="_blank" rel="noopener noreferrer" aria-label="Xem bản đồ" className="bs-map">
          <img src={footerMap} alt="" />
        </a>
      </div>

      <p className="bs-copyright">{COPYRIGHT}</p>
    </footer>
  );
}
