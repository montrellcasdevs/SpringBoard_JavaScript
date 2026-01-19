import { useParams, Link } from 'react-router-dom';
import NavigateBackButton from './NavigateBackButton';
import { getObjectById, getObjectsByCategory } from '../data/celestialObjects';
import '../styles/ContentPage.css';

export default function ContentPage() {
  const { category, id } = useParams();
  
  const object = getObjectById(category, id);
  const allInCategory = getObjectsByCategory(category);

  if (!object) {
    return (
      <div className="error-page">
        <h1>Object Not Found</h1>
        <p>The celestial object you're looking for doesn't exist in our database.</p>
        <NavigateBackButton />
      </div>
    );
  }

  const getCategoryTitle = (cat) => {
    const titles = {
      planets: '🪐 Planets',
      stars: '⭐ Stars',
      galaxies: '🌠 Galaxies'
    };
    return titles[cat] || cat;
  };

  return (
    <div className="content-page">
      <NavigateBackButton />
      
      <div className="content-container">
        <div className="content-main">
          <h1 className="content-title">{object.title}</h1>
          <div className="content-info">
            <p>{object.content}</p>
          </div>
        </div>

        <aside className="sidebar">
          <h3>More {getCategoryTitle(category)}</h3>
          <ul className="related-list">
            {allInCategory.map(item => (
              <li key={item.id}>
                <Link 
                  to={`/${category}/${item.id}`}
                  className={item.id === id ? 'related-link active' : 'related-link'}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
