import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PeluchesPage from '../pages/PeluchesPage';
import CategoriasPage from '../pages/CategoriasPage';
import CreatePeluchePage from '../pages/CreatePeluchePage';
import Header from '../components/Header';

const AppRoutes = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<PeluchesPage />} />
      <Route path="/peluches" element={<PeluchesPage />} />
      <Route path="/peluches/crear" element={<CreatePeluchePage />} />
      <Route path="/categorias" element={<CategoriasPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;
