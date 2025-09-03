import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import PeluchesPage from './pages/PeluchesPage.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/peluches" element={<PeluchesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
