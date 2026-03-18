import React, { useState, useCallback, memo } from 'react';
import { useAuth } from '../contexts/AuthContext';

const FormHeader = memo(({ title, description }) => {
    return (
        <div className="text-center" style={{ marginBottom: '2.5rem' }}>
            <div className="badge">Connect With Us</div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{title}</h2>
            <p style={{ color: 'var(--text-secondary)' }}>{description}</p>
        </div>
    );
});

const Contact = () => {
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        name: user?.username || '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState(null);

    const validate = useCallback((data) => {
        let newErrors = {};
        if (!data.name.trim()) newErrors.name = 'Name is required.';

        if (!data.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            newErrors.email = 'Email address is invalid.';
        }

        if (!data.message.trim()) {
            newErrors.message = 'Message cannot be empty.';
        } else if (data.message.length < 10) {
            newErrors.message = 'Message must be at least 10 characters long.';
        }

        return newErrors;
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
        setSubmitStatus(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSubmitStatus('error');
        } else {
            setErrors({});
            setSubmitStatus('success');
            setTimeout(() => {
                setFormData({ name: user?.username || '', email: '', message: '' });
                setSubmitStatus(null);
            }, 2000);
        }
    };

    return (
        <div className="container">
            <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <FormHeader
                    title="Customer Support"
                    description="We'll get back to you within 24 hours. (Protected Route)"
                />

                {submitStatus === 'success' && (
                    <div className="alert alert-success">
                        Message sent successfully! We'll be in touch soon.
                    </div>
                )}

                {submitStatus === 'error' && (
                    <div className="alert alert-error">
                        Please fix the validation errors below.
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-input"
                            style={{ borderColor: errors.name ? 'var(--error)' : 'var(--border-color)' }}
                            placeholder="Enter your name"
                        />
                        {errors.name && <span className="form-error">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input"
                            style={{ borderColor: errors.email ? 'var(--error)' : 'var(--border-color)' }}
                            placeholder="you@example.com"
                        />
                        {errors.email && <span className="form-error">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            className="form-input"
                            style={{ borderColor: errors.message ? 'var(--error)' : 'var(--border-color)', resize: 'vertical' }}
                            placeholder="How can we help you today?"
                        ></textarea>
                        {errors.message && <span className="form-error">{errors.message}</span>}
                    </div>

                    <button
                        type="submit"
                        disabled={submitStatus === 'success'}
                        className="btn btn-primary"
                        style={{ width: '100%', marginTop: '1rem', padding: '1rem', opacity: submitStatus === 'success' ? 0.7 : 1 }}
                    >
                        {submitStatus === 'success' ? 'Sending Message...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
