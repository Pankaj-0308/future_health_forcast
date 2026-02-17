
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';

const ForecastPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { data: analysisResult, formData: startupData } = location.state || {};

    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!analysisResult || !startupData) {
            console.warn("ForecastPage: Missing data, redirecting.", { analysisResult, startupData });
            navigate('/');
            return;
        }

        const fetchForecast = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/forecast', {
                    startupData,
                    analysisResult
                });
                setForecast(response.data);
            } catch (err) {
                console.error("Forecast Error:", err);
                const msg = err.response?.data?.error || err.message || 'Unknown error';
                setError(`Failed to generate forecast: ${msg}`);
            } finally {
                setLoading(false);
            }
        };

        fetchForecast();
    }, [analysisResult, startupData, navigate]);

    if (!analysisResult) return <div />;

    return (
        <Layout showHeader={true} showFooter={true}>
            <div style={{ background: 'linear-gradient(135deg, #f0f4f8 0%, #e0eaf5 100%)', paddingTop: '2rem', paddingBottom: '2rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate('/results', { state: location.state })}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: '#ffffff',
                            border: '1px solid #e2e8f0',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            fontWeight: '600',
                            color: '#0f172a',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = '#f0f4f8';
                            e.target.style.borderColor = '#cbd5e1';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = '#ffffff';
                            e.target.style.borderColor = '#e2e8f0';
                        }}
                    >
                        <ArrowLeft size={18} /> Back to Analysis
                    </motion.button>
                </div>
            </div>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
                {loading ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                            textAlign: 'center',
                            padding: '4rem 2rem',
                            background: '#ffffff',
                            borderRadius: '16px',
                            border: '1px solid #e2e8f0'
                        }}
                    >
                        <div style={{
                            display: 'inline-block',
                            width: '48px',
                            height: '48px',
                            border: '4px solid #f1f5f9',
                            borderTopColor: '#2563eb',
                            borderRadius: '50%',
                            animation: 'spin 0.8s linear infinite'
                        }} />
                        <h2 style={{ marginTop: '2rem', color: '#0f172a', fontSize: '1.5rem' }}>Generating Your 5-Year Forecast</h2>
                        <p style={{ color: '#64748b', fontSize: '1rem' }}>Analyzing market trajectories and strategic pathways...</p>
                    </motion.div>
                ) : error ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '2rem',
                        backgroundColor: '#fee2e2',
                        color: '#991b1b',
                        borderRadius: '12px',
                        border: '1px solid #f87171'
                    }}>
                        <h3>Unable to Generate Forecast</h3>
                        <p>{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            style={{
                                marginTop: '1rem',
                                padding: '0.75rem 1.5rem',
                                background: '#dc2626',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                <TrendingUp size={28} color="#2563eb" />
                                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#2563eb', letterSpacing: '0.1em', textTransform: 'uppercase' }}>5-Year Projection</span>
                            </div>
                            <h1 style={{
                                fontSize: '3rem',
                                fontWeight: '800',
                                background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                marginBottom: '0.5rem'
                            }}>
                                Strategic Growth Roadmap
                            </h1>
                            <p style={{ fontSize: '1.1rem', color: '#64748b' }}>
                                5-Year Vision for <span style={{ fontWeight: '700', color: '#0f172a' }}>{startupData.startupName}</span>
                            </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
                            {forecast?.year_one && (
                                <motion.div
                                    style={{
                                        gridColumn: 'span 12',
                                        background: 'white',
                                        border: '2px solid #dbeafe',
                                        borderLeft: '6px solid #2563eb',
                                        borderRadius: '12px',
                                        padding: '2.5rem',
                                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.1)'
                                    }}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <h3 style={{ color: '#2563eb', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.5rem', marginBottom: '1rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', background: '#dbeafe', borderRadius: '50%', fontWeight: '800' }}>1</span>
                                        Year One: Market Entry & Traction
                                    </h3>
                                    <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '0.95rem', whiteSpace: 'pre-line' }}>{forecast.year_one}</p>
                                </motion.div>
                            )}

                            {forecast?.year_three && (
                                <motion.div
                                    style={{
                                        gridColumn: 'span 12',
                                        background: 'white',
                                        border: '2px solid #e9d5ff',
                                        borderLeft: '6px solid #8b5cf6',
                                        borderRadius: '12px',
                                        padding: '2.5rem',
                                        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.1)'
                                    }}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h3 style={{ color: '#7c3aed', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.5rem', marginBottom: '1rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', background: '#e9d5ff', borderRadius: '50%', fontWeight: '800', color: '#7c3aed' }}>3</span>
                                        Year Three: Scaling Operations
                                    </h3>
                                    <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '0.95rem', whiteSpace: 'pre-line' }}>{forecast.year_three}</p>
                                </motion.div>
                            )}

                            {forecast?.year_five && (
                                <motion.div
                                    style={{
                                        gridColumn: 'span 12',
                                        background: 'white',
                                        border: '2px solid #fbcfe8',
                                        borderLeft: '6px solid #ec4899',
                                        borderRadius: '12px',
                                        padding: '2.5rem',
                                        boxShadow: '0 4px 12px rgba(236, 72, 153, 0.1)'
                                    }}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <h3 style={{ color: '#be185d', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.5rem', marginBottom: '1rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', background: '#fbcfe8', borderRadius: '50%', fontWeight: '800', color: '#be185d' }}>5</span>
                                        Year Five: Market Leadership
                                    </h3>
                                    <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '0.95rem', whiteSpace: 'pre-line' }}>{forecast.year_five}</p>
                                </motion.div>
                            )}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            {forecast?.risks && (
                                <motion.div
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(220, 38, 38, 0.05) 100%)',
                                        border: '1px solid #fecaca',
                                        borderRadius: '12px',
                                        padding: '2rem'
                                    }}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <h3 style={{ color: '#b91c1c', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '1.2rem' }}>
                                        <AlertTriangle size={24} /> Critical Risks
                                    </h3>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {forecast.risks.map((risk, i) => (
                                            <li key={i} style={{ marginBottom: '0.75rem', padding: '0.75rem 1rem', background: 'white', borderRadius: '8px', color: '#b91c1c', border: '1px solid #fed7d7', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                                <span style={{ marginTop: '0.25rem' }}>•</span>
                                                <span>{risk}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}

                            {forecast?.opportunities && (
                                <motion.div
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%)',
                                        border: '1px solid #a7f3d0',
                                        borderRadius: '12px',
                                        padding: '2rem'
                                    }}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <h3 style={{ color: '#047857', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '1.2rem' }}>
                                        <CheckCircle2 size={24} /> Growth Opportunities
                                    </h3>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {forecast.opportunities.map((opp, i) => (
                                            <li key={i} style={{ marginBottom: '0.75rem', padding: '0.75rem 1rem', background: 'white', borderRadius: '8px', color: '#047857', border: '1px solid #d1fae5', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                                <span style={{ marginTop: '0.25rem' }}>✓</span>
                                                <span>{opp}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </Layout>
    );
};

export default ForecastPage;
