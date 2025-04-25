import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Set page title
document.title = 'DM Contabilidade';

function initializeApp() {
  try {
    const rootElement = document.getElementById('root');
    
    if (!rootElement) {
      throw new Error('Root element not found');
    }

    const root = createRoot(rootElement);
    
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error('Failed to initialize app:', error);
    document.body.innerHTML = '<div style="color: red; padding: 20px;">Erro ao carregar o aplicativo. Por favor, recarregue a página.</div>';
  }
}

initializeApp();
