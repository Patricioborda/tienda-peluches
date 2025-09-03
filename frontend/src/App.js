import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import PeluchesPage from './pages/PeluchesPage.js';
import CategoriasPage from './pages/CategoriasPage.jsx';
import Header from './components/Header.js';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/peluches" element={<PeluchesPage />} />
      <Route path="/categorias" element={<CategoriasPage />} />
    </Routes>
  </Router>
);

export default App;
