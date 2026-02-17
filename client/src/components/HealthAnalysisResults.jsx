import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, AlertTriangle, MapPin, Clock, Shield, TrendingUp, Hospital } from 'lucide-react';

const HealthAnalysisResults = ({ data }) => {
    const {
        symptom_analysis,
        risk_assessment,
        health_trends,
        recommendations,
        nearby_hospitals,
        emergency_indicators
    } = data;

    const getRiskColor = (score) => {
        if (score >= 70) return '#ef4444';
        if (score >= 40) return '#f59e0b';
        return '#10b981';
    };

    const getRiskLabel = (score) => {
        if (score >= 70) return 'High Risk';
        if (score >= 40) return 'Moderate Risk';
        return 'Low Risk';
    };

    return (
        <div style={{ padding: '2rem 0' }}>
            {/* Risk Overview */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '2rem',
                    marginBottom: '2rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    border: '1px solid #e2e8f0'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <Shield size={32} style={{ color: getRiskColor(risk_assessment?.overall_risk_score || 0) }} />
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                            Health Risk Assessment
                        </h2>
                        <p style={{ color: '#64748b', margin: 0 }}>Overall health analysis based on your symptoms</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            background: `conic-gradient(${getRiskColor(risk_assessment?.overall_risk_score || 0)} ${(risk_assessment?.overall_risk_score || 0)}%, #e2e8f0 0%)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1rem',
                            position: 'relative'
                        }}>
                            <div style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                background: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column'
                            }}>
                                <span style={{ fontSize: '2rem', fontWeight: '700', color: '#0f172a' }}>
                                    {risk_assessment?.overall_risk_score || 0}%
                                </span>
                            </div>
                        </div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#0f172a', margin: '0.5rem 0' }}>
                            {getRiskLabel(risk_assessment?.overall_risk_score || 0)}
                        </h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#0f172a', marginBottom: '1rem' }}>Risk Factors</h4>
                        {risk_assessment?.risk_factors?.map((factor, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <AlertTriangle size={16} style={{ color: '#f59e0b' }} />
                                <span style={{ fontSize: '0.9rem', color: '#475569' }}>{factor}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Symptom Analysis */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '2rem',
                    marginBottom: '2rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    border: '1px solid #e2e8f0'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <Activity size={28} style={{ color: '#2563eb' }} />
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                            Symptom Analysis
                        </h2>
                        <p style={{ color: '#64748b', margin: 0 }}>Detailed breakdown of your symptoms</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#0f172a', marginBottom: '1rem' }}>Possible Conditions</h4>
                        {symptom_analysis?.possible_conditions?.map((condition, idx) => (
                            <div key={idx} style={{
                                background: '#f8fafc',
                                padding: '1rem',
                                borderRadius: '8px',
                                marginBottom: '0.75rem',
                                border: '1px solid #e2e8f0'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontWeight: '600', color: '#0f172a' }}>{condition.name}</span>
                                    <span style={{
                                        fontSize: '0.85rem',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        background: condition.probability >= 70 ? '#fee2e2' : condition.probability >= 40 ? '#fed7aa' : '#d1fae5',
                                        color: condition.probability >= 70 ? '#991b1b' : condition.probability >= 40 ? '#92400e' : '#065f46'
                                    }}>
                                        {condition.probability}% match
                                    </span>
                                </div>
                                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>
                                    {condition.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#0f172a', marginBottom: '1rem' }}>Key Symptoms Identified</h4>
                        {symptom_analysis?.key_symptoms?.map((symptom, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                <div style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: '#2563eb'
                                }} />
                                <span style={{ fontSize: '0.9rem', color: '#475569' }}>{symptom}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Health Trends */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '2rem',
                    marginBottom: '2rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    border: '1px solid #e2e8f0'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <TrendingUp size={28} style={{ color: '#10b981' }} />
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                            Health Trends & Predictions
                        </h2>
                        <p style={{ color: '#64748b', margin: 0 }}>Expected progression and recovery timeline</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        border: '1px solid #bbf7d0'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                            <Clock size={20} style={{ color: '#16a34a' }} />
                            <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#166534', margin: 0 }}>Short-term (1-2 weeks)</h4>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#15803d', lineHeight: 1.5 }}>
                            {health_trends?.short_term || "Symptoms expected to stabilize with proper rest and medication."}
                        </p>
                    </div>

                    <div style={{
                        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        border: '1px solid #fcd34d'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                            <TrendingUp size={20} style={{ color: '#d97706' }} />
                            <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#92400e', margin: 0 }}>Medium-term (1-3 months)</h4>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#78350f', lineHeight: 1.5 }}>
                            {health_trends?.medium_term || "Gradual improvement expected with lifestyle adjustments."}
                        </p>
                    </div>

                    <div style={{
                        background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        border: '1px solid #93c5fd'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                            <Shield size={20} style={{ color: '#2563eb' }} />
                            <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1e40af', margin: 0 }}>Long-term (3+ months)</h4>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#1e3a8a', lineHeight: 1.5 }}>
                            {health_trends?.long_term || "Full recovery expected with continued monitoring and preventive care."}
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Nearby Hospitals */}
            {nearby_hospitals && nearby_hospitals.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '2rem',
                        marginBottom: '2rem',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        border: '1px solid #e2e8f0'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <Hospital size={28} style={{ color: '#dc2626' }} />
                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                                Nearby Medical Facilities
                            </h2>
                            <p style={{ color: '#64748b', margin: 0 }}>Hospitals and clinics in your area</p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {nearby_hospitals.map((hospital, idx) => (
                            <div key={idx} style={{
                                background: '#f8fafc',
                                padding: '1.5rem',
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0',
                                transition: 'all 0.2s'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                    <div>
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                                            {hospital.name}
                                        </h4>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                                            <MapPin size={16} />
                                            <span style={{ fontSize: '0.9rem' }}>{hospital.distance}</span>
                                        </div>
                                    </div>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '20px',
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        background: hospital.emergency ? '#fee2e2' : '#dcfce7',
                                        color: hospital.emergency ? '#991b1b' : '#166534'
                                    }}>
                                        {hospital.emergency ? '24/7' : 'Regular'}
                                    </span>
                                </div>
                                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '0.75rem' }}>
                                    {hospital.address}
                                </p>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {hospital.specialties?.slice(0, 3).map((specialty, sidx) => (
                                        <span key={sidx} style={{
                                            padding: '0.25rem 0.5rem',
                                            background: '#e2e8f0',
                                            borderRadius: '4px',
                                            fontSize: '0.8rem',
                                            color: '#475569'
                                        }}>
                                            {specialty}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Emergency Alert */}
            {emergency_indicators?.seek_immediate_care && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                        background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                        borderRadius: '16px',
                        padding: '2rem',
                        marginBottom: '2rem',
                        border: '2px solid #f87171',
                        textAlign: 'center'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <AlertTriangle size={32} style={{ color: '#dc2626' }} />
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#991b1b', margin: 0 }}>
                            Seek Immediate Medical Attention
                        </h2>
                    </div>
                    <p style={{ fontSize: '1.1rem', color: '#7f1d1d', lineHeight: 1.6 }}>
                        {emergency_indicators.reason}
                    </p>
                    <div style={{ marginTop: '1.5rem' }}>
                        <button style={{
                            background: '#dc2626',
                            color: 'white',
                            border: 'none',
                            padding: '1rem 2rem',
                            borderRadius: '8px',
                            fontWeight: '600',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            margin: '0 auto'
                        }}>
                            <Hospital size={20} />
                            Find Nearest Emergency Room
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Recommendations */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '2rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    border: '1px solid #e2e8f0'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <Heart size={28} style={{ color: '#10b981' }} />
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                            Health Recommendations
                        </h2>
                        <p style={{ color: '#64748b', margin: 0 }}>Personalized advice for your recovery</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#0f172a', marginBottom: '1rem' }}>Immediate Actions</h4>
                        {recommendations?.immediate?.map((rec, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    background: '#10b981',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.8rem',
                                    fontWeight: '600',
                                    flexShrink: 0
                                }}>
                                    {idx + 1}
                                </div>
                                <span style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>{rec}</span>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#0f172a', marginBottom: '1rem' }}>Lifestyle Changes</h4>
                        {recommendations?.lifestyle?.map((rec, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    background: '#2563eb',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.8rem',
                                    fontWeight: '600',
                                    flexShrink: 0
                                }}>
                                    {idx + 1}
                                </div>
                                <span style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>{rec}</span>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#0f172a', marginBottom: '1rem' }}>Follow-up Care</h4>
                        {recommendations?.follow_up?.map((rec, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    background: '#8b5cf6',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.8rem',
                                    fontWeight: '600',
                                    flexShrink: 0
                                }}>
                                    {idx + 1}
                                </div>
                                <span style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>{rec}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default HealthAnalysisResults;
