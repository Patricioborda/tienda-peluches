import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import PeluchesPage from './pages/PeluchesPage.js';
import Header from './components/Header.js'; // <-- importamos el Header

const App = () => {
  return (
    <Router>
      <Header /> {/* Header visible en todas las páginas */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/peluches" element={<PeluchesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
