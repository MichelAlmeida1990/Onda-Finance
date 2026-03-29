import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
// Handle chunk loading errors
window.addEventListener('error', (event) => {
    if (event.message.includes('ChunkLoadError') || event.message.includes('Loading chunk')) {
        console.warn('Chunk loading error detected, refreshing page...');
        window.location.reload();
    }
});
createRoot(document.getElementById('root')).render(_jsx(StrictMode, { children: _jsx(App, {}) }));
