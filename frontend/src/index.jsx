import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { AuthProvider } from './contexts/AuthContext';
import { SiteSettingsProvider } from './contexts/SiteSettingsContext';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <SiteSettingsProvider>
        <App />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#2E1216',
              color: '#F5F0F1',
              border: '1px solid rgba(139, 30, 63, 0.4)',
              borderRadius: '12px',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#8B1E3F', secondary: '#F5F0F1' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#F5F0F1' } },
          }}
        />
      </SiteSettingsProvider>
    </AuthProvider>
  </React.StrictMode>
);
