import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/main.css';
// Import KaTeX CSS for math rendering
// Note: KaTeX must be installed: npm install katex @types/katex
import 'katex/dist/katex.min.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);