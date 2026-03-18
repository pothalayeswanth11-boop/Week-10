import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container" style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="glass-panel text-center" style={{ maxWidth: '800px', width: '100%', padding: '4rem 2rem' }}>
                <div className="badge">Welcome to Premium UI</div>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    React Router SPA Design
                </h1>
                <p style={{ fontSize: '1.25rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                    A Single Page Application demonstrating dynamic routing, protected routes, and form engineering completely redesigned with premium glassmorphism aesthetics.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/products" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                        Explore Products
                    </Link>
                    <Link to="/contact" className="btn btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                        Contact Support 🔒
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
