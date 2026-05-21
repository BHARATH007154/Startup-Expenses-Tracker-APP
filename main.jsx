// ============================================
// main.jsx
// This is the entry point of your React app.
// Vite generates this file automatically.
// We only add two imports here:
//   1. Our global CSS variables
//   2. The root <App /> component
// ============================================

import React from 'react'
import ReactDOM from 'react-dom/client'

import './components/variables.css'  // global styles + CSS variables
import App from './App.jsx'

// ReactDOM.createRoot() finds the <div id="root"> in index.html
// and mounts our entire React app inside it.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
