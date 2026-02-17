import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

const HealthDisclaimer = () => {
    return (
        <div style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            border: '1px solid #f59e0b',
            borderRadius: '12px',
            padding: '1.5rem',
            margin: '2rem 0',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem'
        }}>
            <AlertTriangle size={24} style={{ color: '#d97706', flexShrink: 0, marginTop: '0.25rem' }} />
            <div>
                <h4 style={{ color: '#92400e', fontSize: '1.1rem', fontWeight: '600', margin: '0 0 0.75rem 0' }}>
                    Important Medical Disclaimer
                </h4>
                <div style={{ color: '#78350f', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    <p style={{ margin: '0 0 0.5rem 0' }}>
                        <strong>This AI-powered health analysis is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.</strong>
                    </p>
                    <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                        <li>Always seek the advice of a qualified healthcare provider for any medical concerns</li>
                        <li>Do not disregard professional medical advice or delay seeking treatment based on this information</li>
                        <li>In case of medical emergency, call emergency services immediately</li>
                        <li>This system may not capture all aspects of your medical condition</li>
                    </ul>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginTop: '1rem',
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.5)',
                        borderRadius: '8px'
                    }}>
                        <Info size={16} style={{ color: '#d97706' }} />
                        <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>
                            Consult a healthcare professional before making any health decisions.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HealthDisclaimer;
