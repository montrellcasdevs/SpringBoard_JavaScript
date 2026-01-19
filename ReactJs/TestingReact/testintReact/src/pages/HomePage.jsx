import { Link } from 'react-router-dom';
import './HomePage.module.css';

export function HomePage() {
  return (
    <div className="home-page">
      <div className="home-page__container">
        <header className="home-page__header">
          <h1 className="home-page__title">Space Travel</h1>
          <p className="home-page__subtitle">
            Humanity's Last Hope: Interplanetary Evacuation and Relocation
          </p>
        </header>

        <section className="home-page__intro">
          <p className="home-page__text">
            Earth has become uninhabitable due to centuries of environmental degradation. 
            The future of humanity now lies among the stars. Welcome to the Space Travel 
            command center, where you will coordinate the greatest evacuation effort in 
            human history.
          </p>
        </section>

        <section className="home-page__features">
          <h2 className="home-page__features-title">Mission Control Features</h2>
          <div className="home-page__features-grid">
            <div className="home-page__feature-card">
              <h3 className="home-page__feature-title">Manage Fleet</h3>
              <p className="home-page__feature-text">
                View, build, and decommission spacecraft to organize your evacuation fleet.
              </p>
              <Link to="/spacecrafts" className="home-page__feature-link">
                Go to Fleet →
              </Link>
            </div>

            <div className="home-page__feature-card">
              <h3 className="home-page__feature-title">Monitor Planets</h3>
              <p className="home-page__feature-text">
                Track population distribution across planets and deploy spacecraft strategically.
              </p>
              <Link to="/planets" className="home-page__feature-link">
                Go to Planets →
              </Link>
            </div>

            <div className="home-page__feature-card">
              <h3 className="home-page__feature-title">Build Spacecraft</h3>
              <p className="home-page__feature-text">
                Construct new spacecraft with custom specifications for your missions.
              </p>
              <Link to="/construct" className="home-page__feature-link">
                Start Construction →
              </Link>
            </div>
          </div>
        </section>

        <section className="home-page__stats">
          <h2 className="home-page__stats-title">Save Humanity</h2>
          <p className="home-page__stats-text">
            Every decision counts. Use your fleet wisely to transport people to safety 
            and ensure the survival of our species across the cosmos.
          </p>
        </section>
      </div>
    </div>
  );
}
