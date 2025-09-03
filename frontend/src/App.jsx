// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Páginas
import HomePage from './pages/HomePage.jsx';
import PeluchesPage from './pages/PeluchesPage.jsx';
import CategoriasPage from './pages/CategoriasPage.jsx';
import CreatePeluchePage from './pages/CreatePeluchePage';

// Componentes
import Header from './components/Header.js';

const App = () => {
  return (
    <Router>
      {/* Header visible en todas las páginas */}
      <Header />

      {/* Rutas de la aplicación */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/peluches" element={<PeluchesPage />} />
        <Route path="/categorias" element={<CategoriasPage />} />
      </Routes>
    </Router>
  );
};

export default App;
