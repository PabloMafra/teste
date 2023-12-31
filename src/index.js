import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import CadastroDomicilio from './page/CadastroDomicilio';
import CadastroEstoque from './page/CadastroEstoque';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setor" element={<App />} />
        <Route path="/domicilio" element={<CadastroDomicilio />} />
        <Route path="/estoque" element={<CadastroEstoque/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
