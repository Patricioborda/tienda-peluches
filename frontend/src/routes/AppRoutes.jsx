// frontend/src/routes/AppRoutes.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductosPage from '../pages/ProductPage';
import CategoriasPage from '../pages/CategoriasPage';
import CreateProductoPage from '../pages/CreateProductPage';
import Header from '../components/Header';

const AppRoutes = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<ProductosPage />} />
      <Route path="/productos" element={<ProductosPage />} />
      <Route path="/productos/crear" element={<CreateProductoPage />} />
      <Route path="/categorias" element={<CategoriasPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;
