// src/components/PelucheCard.jsx
import React from "react";

function PelucheCard({ peluche, onEdit, onDelete }) {
  return (
    <div className="peluche-card">
      <div className="card-image-container">
        <img
          src={peluche.imagen || "https://via.placeholder.com/400x300/af3f4f6/9ca3af?text=Sin+Imagen"}
          alt={peluche.nombre}
          className="card-image"
          onError={(e) => {
            if (e.target.dataset.errorHandled) return;
            e.target.dataset.errorHandled = true;
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='system-ui' font-size='18'%3ESin Imagen%3C/text%3E%3C/svg%3E";
          }}
        />
        <div className={`stock-badge ${(peluche.stock || 0) > 10 ? 'high' : (peluche.stock || 0) > 5 ? 'medium' : (peluche.stock || 0) > 0 ? 'low' : 'empty'}`}>
          Stock: {peluche.stock || 0}
        </div>
      </div>

      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{peluche.nombre}</h3>
          <div className="card-price">${peluche.precio || 0}</div>
        </div>

        <p className="card-description">{peluche.descripcion || "Sin descripción"}</p>

        <div className="card-category">
          <span className="category-tag">
            <span className="category-icon">🏷️</span>
            {peluche.categoria?.nombre || "Sin categoría"}
          </span>
        </div>

        <div className="card-actions">
          <button onClick={() => onEdit(peluche)} className="btn btn-edit"><span className="btn-icon">✏️</span>Editar</button>
          <button onClick={() => onDelete(peluche.id, peluche.nombre)} className="btn btn-delete"><span className="btn-icon">🗑️</span>Eliminar</button>
        </div>
      </div>
    </div>
  );
}

export default PelucheCard;
