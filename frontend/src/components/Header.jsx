import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.scss";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="app-header">
      {/* Logo */}
      <div className="logo">
        {/* Usamos ruta relativa desde public */}
        <img
          src="/images/LOGO CAPITAN CAPIBARA V2.png"
          alt="Capitán Capibara Logo"
          className="logo-img"
        />
        <h1>Capitán Capibara</h1>
      </div>

      {/* Botón hamburguesa en mobile */}
      <button
        className={`menu-toggle ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menú"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Navegación */}
      <nav className={`nav-links ${menuOpen ? "show" : ""}`}>
        <ul>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
          </li>
          <li>
            <Link to="/productos" onClick={() => setMenuOpen(false)}>Productos</Link>
          </li>
          <li>
            <Link to="/categorias" onClick={() => setMenuOpen(false)}>Categorías</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
