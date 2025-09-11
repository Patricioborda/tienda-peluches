import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./styles/global.scss";

// Páginas
import HomePage from './pages/HomePage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import CategoriasPage from './pages/CategoriasPage.jsx';

// Componentes
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      {/* Header visible en todas las páginas */}
      <Header />

      {/* Rutas de la aplicación */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<ProductPage />} />
        <Route path="/categorias" element={<CategoriasPage />} />
      </Routes>
    </Router>
  );
};

export default App;
