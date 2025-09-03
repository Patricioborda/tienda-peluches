// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage.js';
import PeluchesPage from './pages/PeluchesPage.js';
import CategoriasPage from './pages/CategoriasPage.jsx';
import CreatePeluchePage from './pages/CreatePeluchePage.js';
import Header from './components/Header.js';

const App = () => {
  return (
    <Router>
      <Header /> {/* Header visible en todas las páginas */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/peluches" element={<PeluchesPage />} />
        <Route path="/categorias" element={<CategoriasPage />} />
        <Route path="/create-peluche" element={<CreatePeluchePage />} />
      </Routes>
    </Router>
  );
};

export default App;
