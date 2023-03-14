import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'

const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<App />);
} else {
    throw new Error("Unable to find root element.");
}
