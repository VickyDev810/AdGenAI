import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import Header from './components/header.tsx';
import Footer from './components/footer.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      {/* <Header /> */}
      <App />
      {/* <Footer /> */}
    </Router>
  </StrictMode>
);