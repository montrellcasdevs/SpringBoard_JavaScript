import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import CategoryPage from './components/CategoryPage';
import ContentPage from './components/ContentPage';
import './App.css';

function App() {
  return (
    <>
      <NavBar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/planets" element={<CategoryPage category="planets" />} />
          <Route path="/stars" element={<CategoryPage category="stars" />} />
          <Route path="/galaxies" element={<CategoryPage category="galaxies" />} />
          <Route path="/:category/:id" element={<ContentPage />} />
          <Route path="*" element={
            <div className="error-page">
              <h1>404 - Page Not Found</h1>
              <p>The page you're looking for doesn't exist.</p>
            </div>
          } />
        </Routes>
      </main>
    </>
  );
}

export default App;
