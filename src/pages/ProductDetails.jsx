import React, { useState, useEffect } from 'react';
import { useParams, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return (
        <div className="container text-center" style={{ paddingTop: '5rem' }}>
            <div className="badge" style={{ animation: 'pulse 2s infinite' }}>Loading Info...</div>
        </div>
    );
    if (!product) return (
        <div className="container text-center" style={{ paddingTop: '5rem' }}>
            <div className="alert alert-error">Product not found.</div>
        </div>
    );

    return (
        <div className="container">
            <button
                onClick={() => navigate('/products')}
                className="btn btn-secondary"
                style={{ marginBottom: '2rem', padding: '0.5rem 1rem' }}
            >
                ← Back to Products
            </button>

            <div className="glass-panel" style={{ padding: '3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '16px', padding: '1rem', border: '1px solid var(--border-color)' }}>
                        <img src={product.thumbnail} alt={product.title} style={{ width: '100%', borderRadius: '8px', objectFit: 'cover', transform: 'scale(1.05)', transition: 'transform 0.3s' }} />
                    </div>
                    <div>
                        <div className="badge" style={{ marginBottom: '1rem' }}>{product.category}</div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{product.title}</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Brand: {product.brand || 'Generic'}</span>
                            <span style={{ color: '#fbbf24' }}>⭐ {product.rating}/5</span>
                        </div>
                        
                        <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--success)', marginBottom: '1.5rem' }}>
                            ${product.price}
                        </div>
                        
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2.5rem' }}>
                            {product.description}
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
                            <Link
                                to="reviews"
                                className={`btn ${location.pathname.includes('reviews') ? 'btn-primary' : 'btn-secondary'}`}
                            >
                                Product Reviews
                            </Link>
                            <Link
                                to="specs"
                                className={`btn ${location.pathname.includes('specs') ? 'btn-primary' : 'btn-secondary'}`}
                            >
                                Tech Specs
                            </Link>
                        </div>
                        
                        <div style={{ marginTop: '2rem' }}>
                            <Outlet context={product} />

                            {location.pathname === `/products/${id}` && (
                                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
                                    Select a tab above to view more detailed insights dynamically.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
