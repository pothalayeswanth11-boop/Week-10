import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);

    const filter = searchParams.get('filter') || '';

    useEffect(() => {
        fetch('https://dummyjson.com/products?limit=12')
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setLoading(false);
            });
    }, []);

    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(filter.toLowerCase())
    );

    if (loading) return (
        <div className="container text-center" style={{ paddingTop: '5rem' }}>
            <div className="badge" style={{ animation: 'pulse 2s infinite' }}>Loading Products...</div>
            <h2 style={{ opacity: 0.5 }}>Please wait</h2>
        </div>
    );

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                   <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Premium Products</h2>
                   <p>Explore our carefully curated collection.</p>
                </div>
                <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Search products..."
                        value={filter}
                        onChange={(e) => setSearchParams({ filter: e.target.value })}
                        style={{ paddingLeft: '1.5rem', borderRadius: '999px', background: 'rgba(30, 41, 59, 0.8)' }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-auto">
                {filteredProducts.map(product => (
                    <div key={product.id} className="card">
                        <div className="card-img-wrapper">
                            <img src={product.thumbnail} alt={product.title} className="card-img" />
                            <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                ⭐ {product.rating}
                            </div>
                        </div>
                        <div className="card-content">
                            <h3 className="card-title">{product.title}</h3>
                            <p style={{ fontSize: '0.9rem', marginBottom: '1rem', flexGrow: 1, color: 'var(--text-secondary)' }}>
                                {product.description.substring(0, 50)}...
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                                <div className="card-price">${product.price}</div>
                                <Link to={`/products/${product.id}`} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {filteredProducts.length === 0 && (
                <div className="glass-panel text-center" style={{ marginTop: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>No products found</h3>
                    <p>Try adjusting your search query.</p>
                    <button onClick={() => setSearchParams({})} className="btn btn-secondary" style={{ marginTop: '1rem' }}>Clear Search</button>
                </div>
            )}
        </div>
    );
};

export default Products;
