import { Link } from 'react-router-dom';
import NavigateBackButton from './NavigateBackButton';
import { getObjectsByCategory } from '../data/celestialObjects';
import '../styles/CategoryPage.css';

export default function CategoryPage({ category }) {
  const objects = getObjectsByCategory(category);

  const getCategoryTitle = (cat) => {
    const titles = {
      planets: '🪐 Planets',
      stars: '⭐ Stars',
      galaxies: '🌠 Galaxies'
    };
    return titles[cat] || cat;
  };

  const getCategoryDescription = (cat) => {
    const descriptions = {
      planets: 'Explore the fascinating worlds that orbit our Sun and learn about their unique characteristics.',
      stars: 'Discover the brilliant stars that shine throughout the universe, from our Sun to distant stellar objects.',
      galaxies: 'Journey through vast collections of stars and explore the structure of our universe.'
    };
    return descriptions[cat] || '';
  };

  return (
    <div className="category-page">
      <NavigateBackButton />
      
      <div className="category-header">
        <h1>{getCategoryTitle(category)}</h1>
        <p className="category-description">{getCategoryDescription(category)}</p>
      </div>

      <div className="objects-grid">
        {objects.map(object => (
          <Link 
            key={object.id}
            to={`/${category}/${object.id}`}
            className="object-card"
          >
            <h2>{object.title}</h2>
            <p>{object.content.substring(0, 150)}...</p>
            <span className="read-more">Learn More →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
