import { Link, useLocation } from 'react-router-dom';
import './Header.module.css';

export function Header() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <span className="header__logo-icon">🚀</span>
          <span className="header__logo-text">Space Travel</span>
        </Link>

        <nav className="header__nav">
          <Link
            to="/"
            className={`header__nav-link ${isActive('/') ? 'header__nav-link--active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/spacecrafts"
            className={`header__nav-link ${isActive('/spacecrafts') ? 'header__nav-link--active' : ''}`}
          >
            Fleet
          </Link>
          <Link
            to="/planets"
            className={`header__nav-link ${isActive('/planets') ? 'header__nav-link--active' : ''}`}
          >
            Planets
          </Link>
          <Link
            to="/construct"
            className={`header__nav-link header__nav-link--cta ${isActive('/construct') ? 'header__nav-link--active' : ''}`}
          >
            Build
          </Link>
        </nav>
      </div>
    </header>
  );
}
