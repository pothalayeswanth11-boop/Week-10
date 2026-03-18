import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Contact from './pages/Contact';

function App() {
  return (
    <div>
      <Navbar />

      <main>
        {/* SPA Routing with definitions */}
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Dynamic / Nested Routing setup */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />}>
            {/* Nested Routes! */}
            <Route path="reviews" element={
              <div className="glass-panel" style={{ marginTop: '1rem', padding: '1.5rem', background: 'rgba(16, 185, 129, 0.05)' }}>
                <h3 style={{ color: 'var(--success)', marginBottom: '1rem' }}>Customer Reviews</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
                    <div style={{ color: '#fbbf24', marginBottom: '0.2rem' }}>⭐⭐⭐⭐⭐</div>
                    <p style={{ margin: 0, color: 'var(--text-primary)' }}>"This product is amazing! Totally transformed my workflow."</p>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
                    <div style={{ color: '#fbbf24', marginBottom: '0.2rem' }}>⭐⭐⭐⭐</div>
                    <p style={{ margin: 0, color: 'var(--text-primary)' }}>"Good quality, highly recommended."</p>
                  </div>
                </div>
              </div>
            } />
            <Route path="specs" element={
              <div className="glass-panel" style={{ marginTop: '1rem', padding: '1.5rem', background: 'rgba(59, 130, 246, 0.05)' }}>
                <h3 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>Technical Specifications</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Weight</span> <span>1.2kg</span>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Dimensions</span> <span>10x20x5 cm</span>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Warranty</span> <span>1 Year Premium</span>
                  </li>
                </ul>
              </div>
            } />
          </Route>

          <Route path="/login" element={<Login />} />

          {/* Protected Route! If not logged in, they get sent to /login */}
          <Route path="/contact" element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          } />

          {/* Fallback route for unknown paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
