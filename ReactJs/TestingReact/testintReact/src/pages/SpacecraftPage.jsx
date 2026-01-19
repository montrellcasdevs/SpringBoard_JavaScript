import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SpaceTravelApi } from '../services/SpaceTravelApi';
import { Loading } from '../components/Loading';
import './SpacecraftPage.module.css';

export function SpacecraftPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [spacecraft, setSpacecraft] = useState(null);
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    const craftResponse = await SpaceTravelApi.getSpacecraftById({ id });
    const planetsResponse = await SpaceTravelApi.getPlanets();

    if (craftResponse.isError) {
      setError('Spacecraft not found');
    } else {
      setSpacecraft(craftResponse.data);
    }

    if (!planetsResponse.isError) {
      setPlanets(planetsResponse.data);
    }

    setLoading(false);
  };

  const handleSendToPlanet = async () => {
    if (!selectedPlanet) {
      setError('Please select a destination planet');
      return;
    }

    if (selectedPlanet === spacecraft.currentLocation) {
      setError('Destination must be different from current location');
      return;
    }

    setSending(true);
    const response = await SpaceTravelApi.sendSpacecraftToPlanet({
      spacecraftId: id,
      targetPlanetId: selectedPlanet
    });

    if (response.isError) {
      setError(response.data || 'Failed to send spacecraft');
    } else {
      await fetchData();
      setSelectedPlanet(null);
      setError(null);
    }
    setSending(false);
  };

  const currentPlanet = planets.find(p => p.id === spacecraft?.currentLocation);

  return (
    <div className="spacecraft-page">
      <div className="spacecraft-page__container">
        <Link to="/spacecrafts" className="spacecraft-page__back">
          ← Back to Fleet
        </Link>

        {error && <div className="spacecraft-page__error">{error}</div>}

        {loading ? (
          <Loading />
        ) : !spacecraft ? (
          <div className="spacecraft-page__not-found">
            <h2>Spacecraft not found</h2>
            <Link to="/spacecrafts">Return to Fleet</Link>
          </div>
        ) : (
          <div className="spacecraft-page__content">
            <div className="spacecraft-page__main">
              <div className="spacecraft-page__image-wrapper">
                <img
                  src={spacecraft.pictureUrl}
                  alt={spacecraft.name}
                  className="spacecraft-page__image"
                />
              </div>

              <div className="spacecraft-page__info">
                <h1 className="spacecraft-page__title">{spacecraft.name}</h1>
                <p className="spacecraft-page__description">{spacecraft.description}</p>

                <div className="spacecraft-page__specs">
                  <div className="spacecraft-page__spec">
                    <strong>Capacity:</strong> {spacecraft.capacity} people
                  </div>
                  <div className="spacecraft-page__spec">
                    <strong>Current Location:</strong>{' '}
                    {currentPlanet ? currentPlanet.name : 'Unknown'}
                  </div>
                  <div className="spacecraft-page__spec">
                    <strong>Spacecraft ID:</strong> {spacecraft.id}
                  </div>
                </div>
              </div>
            </div>

            <div className="spacecraft-page__dispatch">
              <h2 className="spacecraft-page__dispatch-title">Dispatch Spacecraft</h2>

              {currentPlanet && (
                <div className="spacecraft-page__current-planet">
                  <p className="spacecraft-page__planet-info">
                    Currently on <strong>{currentPlanet.name}</strong> with{' '}
                    <strong>{currentPlanet.currentPopulation.toLocaleString()}</strong> people
                  </p>
                </div>
              )}

              <div className="spacecraft-page__form">
                <label className="spacecraft-page__label">
                  <strong>Select Destination Planet:</strong>
                  <select
                    value={selectedPlanet || ''}
                    onChange={(e) => setSelectedPlanet(Number(e.target.value))}
                    className="spacecraft-page__select"
                    disabled={sending}
                  >
                    <option value="">-- Choose a planet --</option>
                    {planets
                      .filter(p => p.id !== spacecraft.currentLocation)
                      .map(planet => (
                        <option key={planet.id} value={planet.id}>
                          {planet.name} ({planet.currentPopulation.toLocaleString()} people)
                        </option>
                      ))}
                  </select>
                </label>

                <button
                  className="spacecraft-page__btn-send"
                  onClick={handleSendToPlanet}
                  disabled={!selectedPlanet || sending}
                >
                  {sending ? 'Sending...' : 'Send Spacecraft'}
                </button>

                {planets.filter(p => p.id === spacecraft.currentLocation).length > 0 && (
                  <div className="spacecraft-page__transfer-info">
                    <p>
                      This spacecraft can transfer up to <strong>{spacecraft.capacity}</strong> people.
                      {currentPlanet && spacecraft.capacity > currentPlanet.currentPopulation
                        ? ` It will transfer all ${currentPlanet.currentPopulation.toLocaleString()} available people.`
                        : null}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
