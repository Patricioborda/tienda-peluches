import React, { useState, useEffect } from "react";
import { getPeluches, deletePeluche } from "../services/peluchesService.js";
import Swal from "sweetalert2";
import CreatePeluchePage from "./CreatePeluchePage.js";
import "../styles/PeluchesPage.scss";

function PeluchesPage() {
  const [peluches, setPeluches] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPeluches();
  }, []);

  const fetchPeluches = async () => {
    try {
      const data = await getPeluches();
      setPeluches(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (result.isConfirmed) {
      try {
        await deletePeluche(id);
        Swal.fire("Eliminado", "Peluche eliminado correctamente", "success");
        fetchPeluches();
      } catch (err) {
        Swal.fire("Error", "No se pudo eliminar el peluche", "error");
      }
    }
  };

  return (
    <div className="peluches-page">
      <h1>Peluches</h1>
      <button className="btn-primary" onClick={() => setShowModal(true)}>Agregar Peluche</button>

      <ul className="peluches-list">
        {peluches.map(peluche => (
          <li key={peluche.id} className="peluche-item">
            <img src={peluche.imagen || "https://via.placeholder.com/200"} alt={peluche.nombre} />
            <h2>{peluche.nombre}</h2>
            <p>{peluche.descripcion}</p>
            <p>Precio: ${peluche.precio}</p>
            <p>Stock: {peluche.stock}</p>
            <p>Categoría: {peluche.categoria?.nombre || "Sin categoría"}</p>
            <button className="btn-primary" onClick={() => Swal.fire("Editar", "Funcionalidad pendiente", "info")}>Editar</button>
            <button className="btn-secondary" onClick={() => handleDelete(peluche.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      {showModal && (
        <CreatePeluchePage 
          onClose={() => setShowModal(false)} 
          onSuccess={fetchPeluches} 
        />
      )}
    </div>
  );
}

export default PeluchesPage;
