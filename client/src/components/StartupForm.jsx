
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';

const StartupForm = ({ onSubmit, isLoading }) => {
    const [formData, setFormData] = useState({
        startupName: '',
        industry: '',
        category: '',
        region: '',
        description: ''
    });

    const [touched, setTouched] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleBlur = (e) => {
        setTouched({ ...touched, [e.target.name]: true });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const descriptionLength = formData.description.length;
    const isDescriptionValid = descriptionLength >= 50;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2.5rem',
                maxWidth: '650px',
                margin: '0 auto',
                boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0'
            }}
        >
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', color: '#0f172a', fontSize: '2rem' }}>
                    Analyze Your Startup
                </h2>
                <p style={{ textAlign: 'center', color: '#64748b', marginBottom: 0 }}>
                    Get AI-powered insights and market forecasts for your business idea
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Startup Name */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ color: '#0f172a', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: '#2563eb' }}>*</span> Startup Name
                    </label>
                    <input
                        name="startupName"
                        value={formData.startupName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g. GreenEats Delivery"
                        required
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '0.875rem',
                            background: '#f8fafc',
                            border: formData.startupName ? '1px solid #2563eb' : '1px solid #e2e8f0',
                            borderRadius: '8px',
                            color: '#0f172a',
                            fontSize: '1rem',
                            transition: 'all 0.2s',
                            fontFamily: 'inherit'
                        }}
                    />
                </div>

                {/* Industry and Category */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={{ color: '#0f172a', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ color: '#2563eb' }}>*</span> Industry
                        </label>
                        <input
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="e.g. FoodTech"
                            required
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '0.875rem',
                                background: '#f8fafc',
                                border: formData.industry ? '1px solid #2563eb' : '1px solid #e2e8f0',
                                borderRadius: '8px',
                                color: '#0f172a',
                                fontSize: '1rem',
                                transition: 'all 0.2s',
                                fontFamily: 'inherit'
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ color: '#0f172a', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ color: '#2563eb' }}>*</span> Category
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '0.875rem',
                                background: '#f8fafc',
                                border: formData.category ? '1px solid #2563eb' : '1px solid #e2e8f0',
                                borderRadius: '8px',
                                color: '#0f172a',
                                fontSize: '1rem',
                                transition: 'all 0.2s',
                                fontFamily: 'inherit',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="">Select Category</option>
                            <option value="SaaS">SaaS</option>
                            <option value="E-Commerce">E-Commerce</option>
                            <option value="AI/ML">AI/ML</option>
                            <option value="HealthTech">HealthTech</option>
                            <option value="FinTech">FinTech</option>
                            <option value="EdTech">EdTech</option>
                            <option value="CleanTech">CleanTech</option>
                            <option value="Consumer Goods">Consumer Goods</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                {/* Region */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ color: '#0f172a', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: '#2563eb' }}>*</span> Target Region
                    </label>
                    <input
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g. Austin, TX or Europe"
                        required
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '0.875rem',
                            background: '#f8fafc',
                            border: formData.region ? '1px solid #2563eb' : '1px solid #e2e8f0',
                            borderRadius: '8px',
                            color: '#0f172a',
                            fontSize: '1rem',
                            transition: 'all 0.2s',
                            fontFamily: 'inherit'
                        }}
                    />
                </div>

                {/* Description */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                        <label style={{ color: '#0f172a', fontWeight: '600', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ color: '#2563eb' }}>*</span> Business Description
                        </label>
                        <span style={{ fontSize: '0.8rem', color: isDescriptionValid ? '#10b981' : '#ef4444' }}>
                            {descriptionLength}/50 characters
                        </span>
                    </div>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows="4"
                        placeholder="Describe your product, target market, unique value proposition, and business model..."
                        required
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '0.875rem',
                            background: '#f8fafc',
                            border: isDescriptionValid ? '1px solid #2563eb' : descriptionLength > 0 ? '1px solid #ef4444' : '1px solid #e2e8f0',
                            borderRadius: '8px',
                            color: '#0f172a',
                            fontSize: '1rem',
                            transition: 'all 0.2s',
                            fontFamily: 'inherit',
                            resize: 'vertical'
                        }}
                    />
                    {descriptionLength > 0 && descriptionLength < 50 && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.85rem', color: '#ef4444' }}>
                            <AlertCircle size={16} /> Minimum 50 characters required
                        </div>
                    )}
                    {isDescriptionValid && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.85rem', color: '#10b981' }}>
                            <CheckCircle size={16} /> Ready to analyze
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading || !isDescriptionValid}
                    style={{
                        width: '100%',
                        padding: '1rem',
                        background: isLoading || !isDescriptionValid ? '#cbd5e1' : 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: isLoading || !isDescriptionValid ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s',
                        fontSize: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        boxShadow: isLoading || !isDescriptionValid ? 'none' : '0 4px 12px rgba(37, 99, 235, 0.3)'
                    }}
                >
                    {isLoading ? (
                        <>
                            <span style={{
                                display: 'inline-block',
                                width: '16px',
                                height: '16px',
                                border: '2px solid rgba(255,255,255,0.3)',
                                borderRadius: '50%',
                                borderTopColor: 'white',
                                animation: 'spin 0.6s linear infinite'
                            }} />
                            Analyzing Your Startup...
                        </>
                    ) : (
                        '🚀 Get AI Analysis'
                    )}
                </button>
            </form>

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </motion.div>
    );
};

export default StartupForm;
