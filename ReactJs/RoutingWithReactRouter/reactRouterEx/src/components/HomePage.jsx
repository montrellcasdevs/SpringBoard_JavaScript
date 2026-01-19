import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="home-content">
        <h1>🌌 Welcome to the Cosmic Encyclopedia 🌌</h1>
        <p className="intro-text">
          Embark on an extraordinary journey through the wonders of space! Explore the magnificent 
          celestial objects that populate our universe, from the rocky planets orbiting our Sun to 
          the distant galaxies that light up the night sky.
        </p>
        
        <div className="categories-grid">
          <Link to="/planets" className="category-card planets-card">
            <h2>🪐 Planets</h2>
            <p>Discover the diverse worlds in our solar system, from scorching Mercury to the ringed beauty of Saturn.</p>
          </Link>
          
          <Link to="/stars" className="category-card stars-card">
            <h2>⭐ Stars</h2>
            <p>Learn about the brilliant stars that light up the cosmos, including our own Sun and distant stellar giants.</p>
          </Link>
          
          <Link to="/galaxies" className="category-card galaxies-card">
            <h2>🌠 Galaxies</h2>
            <p>Explore vast collections of stars, from our Milky Way to the nearby Andromeda Galaxy and beyond.</p>
          </Link>
        </div>
        
        <div className="info-section">
          <h3>About This Encyclopedia</h3>
          <p>
            This interactive guide provides fascinating insights into the celestial objects that make up our universe. 
            Whether you're a student of astronomy, a space enthusiast, or simply curious about the cosmos, 
            you'll find information to captivate your imagination and expand your understanding of the universe.
          </p>
        </div>
      </div>
    </div>
  );
}
