import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            login(username);
            navigate(from, { replace: true });
        }
    };

    return (
        <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="glass-panel" style={{ maxWidth: '450px', width: '100%', padding: '3rem 2.5rem' }}>
                <div className="text-center" style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome Back</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Sign in to continue to your account</p>
                </div>
                
                {from !== '/' && (
                    <div className="alert alert-error">
                        You must be logged in to view that page.
                    </div>
                )}
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-input"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.875rem' }}>
                        Sign In →
                    </button>
                    
                    <div className="text-center" style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        Use any username to login securely.
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
