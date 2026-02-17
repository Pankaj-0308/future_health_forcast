import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, AlertTriangle, CheckCircle2, Shield, Activity, Clock, TrendingUp } from 'lucide-react';

const HealthForecastPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { data: analysisResult, formData: healthData } = location.state || {};

    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!analysisResult || !healthData) {
            console.warn("HealthForecastPage: Missing data, redirecting.", { analysisResult, healthData });
            navigate('/');
            return;
        }

        const fetchForecast = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/health-forecast', {
                    healthData,
                    analysisResult
                });
                setForecast(response.data);
            } catch (err) {
                console.error("Health Forecast Error:", err);
                const msg = err.response?.data?.error || err.message || 'Unknown error';
                setError(`Failed to generate health forecast: ${msg}`);
            } finally {
                setLoading(false);
            }
        };

        fetchForecast();
    }, [analysisResult, healthData, navigate]);

    if (!analysisResult) return <div />;

    return (
        <Layout showHeader={true} showFooter={true}>
            <div style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', paddingTop: '2rem', paddingBottom: '2rem' }}>
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
                            borderTopColor: '#10b981',
                            borderRadius: '50%',
                            animation: 'spin 0.8s linear infinite'
                        }} />
                        <h2 style={{ marginTop: '2rem', color: '#0f172a', fontSize: '1.5rem' }}>Generating Your Health Forecast</h2>
                        <p style={{ color: '#64748b', fontSize: '1rem' }}>Analyzing health trends and creating personalized wellness plan...</p>
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
                        <h3>Unable to Generate Health Forecast</h3>
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
                                <Heart size={28} color="#10b981" />
                                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#10b981', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Health Forecast</span>
                            </div>
                            <h1 style={{
                                fontSize: '3rem',
                                fontWeight: '800',
                                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                marginBottom: '0.5rem'
                            }}>
                                Personalized Wellness Roadmap
                            </h1>
                            <p style={{ fontSize: '1.1rem', color: '#64748b' }}>
                                Health Journey for <span style={{ fontWeight: '700', color: '#0f172a' }}>{healthData.patientName}</span>
                            </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
                            {forecast?.short_term_outlook && (
                                <motion.div
                                    style={{
                                        gridColumn: 'span 12',
                                        background: 'white',
                                        border: '2px solid #dcfce7',
                                        borderLeft: '6px solid #10b981',
                                        borderRadius: '12px',
                                        padding: '2.5rem',
                                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.1)'
                                    }}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <h3 style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.5rem', marginBottom: '1rem' }}>
                                        <Clock size={32} />
                                        Short-Term Outlook (1-2 weeks)
                                    </h3>
                                    <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '0.95rem', whiteSpace: 'pre-line' }}>{forecast.short_term_outlook}</p>
                                </motion.div>
                            )}

                            {forecast?.medium_term_outlook && (
                                <motion.div
                                    style={{
                                        gridColumn: 'span 12',
                                        background: 'white',
                                        border: '2px solid #fef3c7',
                                        borderLeft: '6px solid #f59e0b',
                                        borderRadius: '12px',
                                        padding: '2.5rem',
                                        boxShadow: '0 4px 12px rgba(245, 158, 11, 0.1)'
                                    }}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h3 style={{ color: '#d97706', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.5rem', marginBottom: '1rem' }}>
                                        <TrendingUp size={32} />
                                        Medium-Term Outlook (1-3 months)
                                    </h3>
                                    <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '0.95rem', whiteSpace: 'pre-line' }}>{forecast.medium_term_outlook}</p>
                                </motion.div>
                            )}

                            {forecast?.long_term_outlook && (
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
                                    transition={{ delay: 0.3 }}
                                >
                                    <h3 style={{ color: '#2563eb', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.5rem', marginBottom: '1rem' }}>
                                        <Shield size={32} />
                                        Long-Term Outlook (3+ months)
                                    </h3>
                                    <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '0.95rem', whiteSpace: 'pre-line' }}>{forecast.long_term_outlook}</p>
                                </motion.div>
                            )}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                            {forecast?.prevention_strategies && (
                                <motion.div
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%)',
                                        border: '1px solid #a7f3d0',
                                        borderRadius: '12px',
                                        padding: '2rem'
                                    }}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <h3 style={{ color: '#047857', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '1.2rem' }}>
                                        <Shield size={24} /> Prevention Strategies
                                    </h3>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {forecast.prevention_strategies.map((strategy, i) => (
                                            <li key={i} style={{ marginBottom: '0.75rem', padding: '0.75rem 1rem', background: 'white', borderRadius: '8px', color: '#047857', border: '1px solid #d1fae5', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                                <span style={{ marginTop: '0.25rem', color: '#10b981' }}>✓</span>
                                                <span>{strategy}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}

                            {forecast?.lifestyle_recommendations && (
                                <motion.div
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(29, 78, 216, 0.05) 100%)',
                                        border: '1px solid #bfdbfe',
                                        borderRadius: '12px',
                                        padding: '2rem'
                                    }}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <h3 style={{ color: '#1e40af', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '1.2rem' }}>
                                        <Activity size={24} /> Lifestyle Recommendations
                                    </h3>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {forecast.lifestyle_recommendations.map((rec, i) => (
                                            <li key={i} style={{ marginBottom: '0.75rem', padding: '0.75rem 1rem', background: 'white', borderRadius: '8px', color: '#1e40af', border: '1px solid #dbeafe', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                                <span style={{ marginTop: '0.25rem', color: '#2563eb' }}>•</span>
                                                <span>{rec}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </div>

                        {forecast?.warning_signs && (
                            <motion.div
                                style={{
                                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(220, 38, 38, 0.05) 100%)',
                                    border: '1px solid #fecaca',
                                    borderRadius: '12px',
                                    padding: '2rem'
                                }}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <h3 style={{ color: '#b91c1c', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '1.2rem' }}>
                                    <AlertTriangle size={24} /> Warning Signs - Seek Medical Attention
                                </h3>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {forecast.warning_signs.map((warning, i) => (
                                        <li key={i} style={{ marginBottom: '0.75rem', padding: '0.75rem 1rem', background: 'white', borderRadius: '8px', color: '#b91c1c', border: '1px solid #fed7d7', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                            <span style={{ marginTop: '0.25rem', color: '#ef4444' }}>⚠</span>
                                            <span>{warning}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div style={{
                                    marginTop: '1.5rem',
                                    padding: '1rem',
                                    background: '#fee2e2',
                                    borderRadius: '8px',
                                    border: '1px solid #f87171',
                                    textAlign: 'center'
                                }}>
                                    <p style={{ color: '#7f1d1d', fontWeight: '600', margin: 0 }}>
                                        If you experience any of these warning signs, please seek immediate medical attention or call emergency services.
                                    </p>
                                </div>
                            </motion.div>
                        )}
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

export default HealthForecastPage;
