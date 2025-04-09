import React from 'react';
import ReactDOM from 'react-dom/client';
import { BasicExample } from '../examples/BasicExample';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BasicExample />
  </React.StrictMode>
);
