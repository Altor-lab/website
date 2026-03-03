import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import './index.css'

// Handle GitHub Pages 404.html SPA redirect (?p=/some/path)
const params = new URLSearchParams(window.location.search)
const redirectPath = params.get('p')
if (redirectPath) {
  window.history.replaceState(null, '', decodeURIComponent(redirectPath))
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
