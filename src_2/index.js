// /src

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css';
import Home from './components/pages/Home';
import reportWebVitals from './reportWebVitals';
import Navbar from './components/Header'
import LoginForm from './components/LoginForm';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
