import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🌌 Cosmic Encyclopedia
        </Link>
        
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/planets" className="navbar-link">Planets</Link>
          </li>
          <li className="navbar-item">
            <Link to="/stars" className="navbar-link">Stars</Link>
          </li>
          <li className="navbar-item">
            <Link to="/galaxies" className="navbar-link">Galaxies</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
