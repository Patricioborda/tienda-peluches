import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js'; // <- extensión obligatoria por type: module
import './styles/global.scss'; // archivo de estilos globales

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
