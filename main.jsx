import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './src/App.jsx' // This was the error; added /src/

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
