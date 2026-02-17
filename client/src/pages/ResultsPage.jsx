

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HealthAnalysisResults from '../components/HealthAnalysisResults';
import Layout from '../components/Layout';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, MapPin } from 'lucide-react';

const ResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state?.data;
    const healthData = location.state?.formData;

    const [forecast, setForecast] = useState(null);
    const [loadingForecast, setLoadingForecast] = useState(false);

    useEffect(() => {
        if (!data) {
            navigate('/');
        }
    }, [data, navigate]);

    const handleForecast = () => {
        navigate('/forecast', {
            state: {
                data: data,
                formData: healthData
            }
        });
    };

    if (!data) return null;

    return (
        <Layout showHeader={true} showFooter={true}>
            <div style={{ background: 'linear-gradient(135deg, #f0f4f8 0%, #e0eaf5 100%)', paddingTop: '3rem', paddingBottom: '2rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate('/')}
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
                        <ArrowLeft size={18} /> Analyze Another Health Case
                    </motion.button>

                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={handleForecast}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            fontWeight: '600',
                            color: 'white',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.4)';
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        <Heart size={18} /> Health Forecast
                    </motion.button>
                </div>
            </div>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                <HealthAnalysisResults data={data} />
            </div>
        </Layout>
    );
};

export default ResultsPage;
