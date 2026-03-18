import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="nav-brand">
                    <NavLink to="/" className="navbar-brand">
                        Premium SPA
                    </NavLink>
                </div>

                <div className="navbar-links">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        Home
                    </NavLink>
                    <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        Products
                    </NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        Contact Support 🔒
                    </NavLink>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {user ? (
                        <>
                            <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Hi, {user.username}</span>
                            <button className="btn btn-secondary" onClick={handleLogout} style={{ padding: '0.5rem 1rem' }}>Logout</button>
                        </>
                    ) : (
                        <NavLink to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>Login</NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
