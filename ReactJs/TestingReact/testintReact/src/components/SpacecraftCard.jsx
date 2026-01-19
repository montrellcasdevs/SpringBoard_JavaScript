import { Link } from 'react-router-dom';
import './SpacecraftCard.module.css';

export function SpacecraftCard({ spacecraft }) {
  return (
    <div className="spacecraft-card">
      <div className="spacecraft-card__image-wrapper">
        <img 
          src={spacecraft.pictureUrl} 
          alt={spacecraft.name}
          className="spacecraft-card__image"
        />
      </div>
      <div className="spacecraft-card__content">
        <h3 className="spacecraft-card__title">{spacecraft.name}</h3>
        <p className="spacecraft-card__capacity">
          <strong>Capacity:</strong> {spacecraft.capacity} people
        </p>
        <p className="spacecraft-card__description">{spacecraft.description}</p>
        <Link to={`/spacecraft/${spacecraft.id}`} className="spacecraft-card__link">
          View Details
        </Link>
      </div>
    </div>
  );
}
