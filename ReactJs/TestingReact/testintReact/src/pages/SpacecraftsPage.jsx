import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SpaceTravelApi } from '../services/SpaceTravelApi';
import { Loading } from '../components/Loading';
import { SpacecraftCard } from '../components/SpacecraftCard';
import './SpacecraftsPage.module.css';

export function SpacecraftsPage() {
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSpacecrafts();
  }, []);

  const fetchSpacecrafts = async () => {
    setLoading(true);
    const response = await SpaceTravelApi.getSpacecrafts();
    if (response.isError) {
      setError('Failed to load spacecrafts');
    } else {
      setSpacecrafts(response.data);
    }
    setLoading(false);
  };

  const handleDestroy = async (id) => {
    if (window.confirm('Are you sure you want to decommission this spacecraft?')) {
      const response = await SpaceTravelApi.destroySpacecraftById({ id });
      if (!response.isError) {
        setSpacecrafts(spacecrafts.filter(s => s.id !== id));
      } else {
        setError('Failed to decommission spacecraft');
      }
    }
  };

  return (
    <div className="spacecrafts-page">
      <div className="spacecrafts-page__container">
        <header className="spacecrafts-page__header">
          <h1 className="spacecrafts-page__title">Fleet Management</h1>
          <p className="spacecrafts-page__subtitle">
            Manage your spacecraft fleet for humanity's evacuation
          </p>
        </header>

        <div className="spacecrafts-page__actions">
          <Link to="/construct" className="spacecrafts-page__btn spacecrafts-page__btn--primary">
            Build New Spacecraft
          </Link>
          <Link to="/" className="spacecrafts-page__btn spacecrafts-page__btn--secondary">
            Back to Home
          </Link>
        </div>

        {error && <div className="spacecrafts-page__error">{error}</div>}

        {loading ? (
          <Loading />
        ) : spacecrafts.length === 0 ? (
          <div className="spacecrafts-page__empty">
            <p>No spacecraft in your fleet yet. Build one to get started!</p>
            <Link to="/construct" className="spacecrafts-page__btn spacecrafts-page__btn--primary">
              Build First Spacecraft
            </Link>
          </div>
        ) : (
          <div className="spacecrafts-page__grid">
            {spacecrafts.map(spacecraft => (
              <div key={spacecraft.id} className="spacecrafts-page__card-wrapper">
                <SpacecraftCard spacecraft={spacecraft} />
                <div className="spacecrafts-page__card-actions">
                  <button
                    className="spacecrafts-page__btn-destroy"
                    onClick={() => handleDestroy(spacecraft.id)}
                  >
                    Decommission
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
