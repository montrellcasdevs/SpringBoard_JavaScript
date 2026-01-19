import './PlanetCard.module.css';

export function PlanetCard({ planet, spacecrafts }) {
  const planetSpacecrafts = spacecrafts.filter(s => s.currentLocation === planet.id);

  return (
    <div className="planet-card">
      <div className="planet-card__image-wrapper">
        <img 
          src={planet.pictureUrl} 
          alt={planet.name}
          className="planet-card__image"
        />
      </div>
      <div className="planet-card__content">
        <h3 className="planet-card__title">{planet.name}</h3>
        <p className="planet-card__population">
          <strong>Population:</strong> {planet.currentPopulation.toLocaleString()}
        </p>
        <div className="planet-card__spacecrafts">
          <strong>Stationed Spacecraft:</strong>
          {planetSpacecrafts.length > 0 ? (
            <ul className="planet-card__list">
              {planetSpacecrafts.map(craft => (
                <li key={craft.id} className="planet-card__item">
                  {craft.name} (Capacity: {craft.capacity})
                </li>
              ))}
            </ul>
          ) : (
            <p className="planet-card__no-spacecrafts">No spacecraft stationed</p>
          )}
        </div>
      </div>
    </div>
  );
}
