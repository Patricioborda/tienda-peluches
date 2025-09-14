// frontend/src/pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.scss";

const HomePage = () => {
  return (
    <div
      className="home-page"
      style={{ backgroundImage: "url('/images/capitan-capibara-home.png')" }}
    >
      <div className="overlay">
        <h1>Bienvenido a la Tienda de Productos</h1>
        <p>Explora nuestros productos y encuentra tu favorito.</p>
        <Link to="/productos" className="btn-primary">
          Ver Productos
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
