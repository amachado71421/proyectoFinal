import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Routing from '../src/Routes/Routing.jsx';
import { AuthProvider } from './Context/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Routing />
    </AuthProvider>
  </StrictMode>
);
