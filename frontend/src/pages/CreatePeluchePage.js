import React, { useState } from "react";
import { createPeluche } from "../services/peluchesService";
import Swal from "sweetalert2";
import "../styles/PeluchesPage.css";

function CreatePeluchePage() {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagen: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPeluche({
        ...form,
        precio: Number(form.precio),
        stock: Number(form.stock),
      });
      Swal.fire("Éxito", "Peluche creado correctamente", "success");
      setForm({ nombre: "", descripcion: "", precio: "", stock: "", imagen: "" });
    } catch (err) {
      Swal.fire("Error", "No se pudo crear el peluche", "error");
    }
  };

  return (
    <div className="peluches-page">
      <h1>Agregar Peluche</h1>
      <form onSubmit={handleSubmit} className="peluche-form">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imagen"
          placeholder="URL Imagen"
          value={form.imagen}
          onChange={handleChange}
        />
        <button type="submit" className="btn-primary">Guardar</button>
      </form>
    </div>
  );
}

export default CreatePeluchePage;
