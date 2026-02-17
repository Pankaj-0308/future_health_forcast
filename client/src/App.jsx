import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import ResultsPage from './pages/ResultsPage';
import HealthForecastPage from './pages/HealthForecastPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/forecast" element={<HealthForecastPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
