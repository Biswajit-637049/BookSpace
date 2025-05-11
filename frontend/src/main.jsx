import { createRoot } from 'react-dom/client';
import './index.css';
import App from "./App";
import React from 'react';
import {BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import store from './store/index';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
)
