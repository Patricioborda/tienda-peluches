import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || '/api';

console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
console.log('Base URL final:', BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true, // si manejas cookies o sesión
});

export default api;
