import React from 'react';
import ReactDOM from 'react-dom/client';
import Rotas from './config/Rotas';
import "./styles/global.css";
import "./styles/buttons.css";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Rotas/>
  </React.StrictMode>
);

