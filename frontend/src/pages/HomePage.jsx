// frontend/src/pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.scss"; // estilos base

const HomePage = () => {
  return (
    <div className="home-page" style={{ padding: "20px", textAlign: "center" }}>
      <h1>Bienvenido a la Tienda de Productos</h1>
      <p>Explora nuestros productos y encuentra tu favorito.</p>
      <Link
        to="/productos"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "10px 16px",
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "6px",
          textDecoration: "none",
          fontSize: "14px",
          transition: "background-color 0.2s, transform 0.2s",
        }}
      >
        Ver Productos
      </Link>
    </div>
  );
};

export default HomePage;
