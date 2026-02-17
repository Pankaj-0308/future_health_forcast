
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SymptomForm from '../components/SymptomForm';
import HealthDisclaimer from '../components/HealthDisclaimer';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Heart, Activity, MapPin, Shield, Stethoscope, Ambulance } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const videoSrc = '/video.mp4';

    const handleAnalyze = async (formData) => {
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/analyze-symptoms', formData);
            navigate('/results', { state: { data: response.data, formData: formData } });
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Failed to connect to the health analysis service. Please check your API Key.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout showHeader={true} showFooter={true}>
            {/* Hero Section */}
            <div style={{ 
                position: 'relative', 
                paddingTop: '4rem', 
                paddingBottom: '3rem', 
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #f0f4f8 0%, #e0eaf5 100%)'
            }}>
                {/* Video Background */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls={false}
                    src={videoSrc}
                    onLoadStart={() => console.log('Video load started')}
                    onCanPlay={() => console.log('Video can play')}
                    onError={(e) => console.error('Video error:', e)}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: -2
                    }}
                />
                
                {/* Overlay for better text readability */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, rgba(240, 244, 248, 0.9) 0%, rgba(224, 234, 245, 0.9) 100%)',
                        zIndex: -1
                    }}
                />
                
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ textAlign: 'center', marginBottom: '3rem' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                            <Heart size={24} color="#10b981" />
                            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#10b981', letterSpacing: '0.1em', textTransform: 'uppercase' }}>AI-Powered Healthcare</span>
                        </div>
                        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem', lineHeight: 1.2 }}>
                            Your Personal Health Assistant
                        </h1>
                        <p style={{
                            fontSize: '1.25rem',
                            color: '#475569',
                            maxWidth: '700px',
                            margin: '0 auto',
                            lineHeight: 1.6
                        }}>
                            Get comprehensive symptom analysis, health risk assessments, and find nearby medical facilities powered by advanced AI. Take control of your health journey.
                        </p>
                    </motion.div>

                    {/* Features */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '3rem' }}
                    >
                        {[
                            { icon: Activity, title: 'Symptom Analysis', desc: 'AI-powered analysis of your symptoms and health patterns' },
                            { icon: MapPin, title: 'Hospital Finder', desc: 'Locate nearby medical facilities based on your location' },
                            { icon: Shield, title: 'Risk Assessment', desc: 'Predictive health risk analysis and prevention strategies' },
                            { icon: Stethoscope, title: 'Health Insights', desc: 'Personalized health recommendations and lifestyle advice' }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + idx * 0.1 }}
                                style={{
                                    background: 'white',
                                    padding: '1.5rem',
                                    borderRadius: '12px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                    border: '1px solid #e2e8f0',
                                    textAlign: 'center'
                                }}
                            >
                                <div style={{ color: '#10b981', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                    <feature.icon size={32} />
                                </div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>
                                    {feature.title}
                                </h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{feature.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Form Section */}
            <div style={{ padding: '4rem 2rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <HealthDisclaimer />
                    <SymptomForm onSubmit={handleAnalyze} isLoading={isLoading} />

                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{
                                marginTop: '1.5rem',
                                padding: '1.25rem',
                                backgroundColor: '#fee2e2',
                                color: '#991b1b',
                                borderRadius: '8px',
                                textAlign: 'center',
                                border: '1px solid #f87171',
                                maxWidth: '650px',
                                margin: '1.5rem auto 0'
                            }}
                        >
                            {error}
                        </motion.div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Home;
