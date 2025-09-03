import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
  baseURL: 'http://localhost:5000', // Cambiá el puerto si tu backend corre en otro
  timeout: 5000, // Tiempo máximo de espera
});

export default api;
