import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {AppProvider } from './providers/AppProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <React.StrictMode>
      <AppProvider>
        <App />
      </AppProvider>
    </React.StrictMode>,
  </ Router>
)
