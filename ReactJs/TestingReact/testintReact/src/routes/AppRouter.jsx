import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { SpacecraftsPage } from '../pages/SpacecraftsPage';
import { SpacecraftPage } from '../pages/SpacecraftPage';
import { ConstructionPage } from '../pages/ConstructionPage';
import { PlanetsPage } from '../pages/PlanetsPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/spacecrafts" element={<SpacecraftsPage />} />
        <Route path="/spacecraft/:id" element={<SpacecraftPage />} />
        <Route path="/construct" element={<ConstructionPage />} />
        <Route path="/planets" element={<PlanetsPage />} />
        {/* Catch-all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
