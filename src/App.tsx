import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

const ChristianPage = React.lazy(() => import('./pages/ChristianPage'));
const HinduPage = React.lazy(() => import('./pages/HinduPage'));
const IslamicPage = React.lazy(() => import('./pages/IslamicPage'));

const LoadingFallback = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/christian" element={<ChristianPage />} />
          <Route path="/hindu" element={<HinduPage />} />
          <Route path="/islamic" element={<IslamicPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}