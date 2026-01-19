import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SpaceTravelApi } from '../services/SpaceTravelApi';
import { Loading } from '../components/Loading';
import { PlanetCard } from '../components/PlanetCard';
import './PlanetsPage.module.css';

export function PlanetsPage() {
  const [planets, setPlanets] = useState([]);
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const planetsResponse = await SpaceTravelApi.getPlanets();
    const spacecraftsResponse = await SpaceTravelApi.getSpacecrafts();

    if (planetsResponse.isError) {
      setError('Failed to load planets');
    } else {
      setPlanets(planetsResponse.data);
    }

    if (!spacecraftsResponse.isError) {
      setSpacecrafts(spacecraftsResponse.data);
    }

    setLoading(false);
  };

  return (
    <div className="planets-page">
      <div className="planets-page__container">
        <header className="planets-page__header">
          <h1 className="planets-page__title">Planetary Overview</h1>
          <p className="planets-page__subtitle">
            Monitor population distribution and spacecraft deployment across the solar system
          </p>
        </header>

        <div className="planets-page__actions">
          <Link to="/spacecrafts" className="planets-page__btn planets-page__btn--primary">
            Manage Fleet
          </Link>
          <Link to="/" className="planets-page__btn planets-page__btn--secondary">
            Back to Home
          </Link>
        </div>

        {error && <div className="planets-page__error">{error}</div>}

        {loading ? (
          <Loading />
        ) : planets.length === 0 ? (
          <div className="planets-page__empty">
            <p>No planets available</p>
          </div>
        ) : (
          <div className="planets-page__grid">
            {planets.map(planet => (
              <PlanetCard
                key={planet.id}
                planet={planet}
                spacecrafts={spacecrafts}
              />
            ))}
          </div>
        )}

        <section className="planets-page__info">
          <h2 className="planets-page__info-title">Population Management</h2>
          <div className="planets-page__info-content">
            <p>
              Total Population Across All Planets:{' '}
              <strong>{planets.reduce((sum, p) => sum + p.currentPopulation, 0).toLocaleString()}</strong>
            </p>
            <p>
              Total Spacecraft Available: <strong>{spacecrafts.length}</strong>
            </p>
            <p>
              Total Transport Capacity:{' '}
              <strong>{spacecrafts.reduce((sum, s) => sum + s.capacity, 0).toLocaleString()}</strong> people per mission
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
