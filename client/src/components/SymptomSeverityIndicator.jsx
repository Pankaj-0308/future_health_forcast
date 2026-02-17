import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Info } from 'lucide-react';

const SymptomSeverityIndicator = ({ symptoms }) => {
    const getSeverityLevel = (symptoms) => {
        const severeKeywords = [
            'chest pain', 'difficulty breathing', 'shortness of breath', 'severe headache',
            'loss of consciousness', 'fainting', 'confusion', 'numbness', 'weakness',
            'vision loss', 'slurred speech', 'high fever', 'severe pain', 'bleeding',
            'emergency', 'urgent', 'critical', 'life threatening'
        ];
        
        const moderateKeywords = [
            'fever', 'pain', 'headache', 'cough', 'fatigue', 'nausea', 'vomiting',
            'dizziness', 'sore throat', 'body aches', 'chills', 'sweating'
        ];
        
        const symptomsLower = symptoms.toLowerCase();
        
        if (severeKeywords.some(keyword => symptomsLower.includes(keyword))) {
            return {
                level: 'severe',
                color: '#dc2626',
                bgColor: '#fee2e2',
                borderColor: '#f87171',
                icon: AlertTriangle,
                message: 'Severe symptoms detected - Consider seeking immediate medical attention',
                recommendation: 'Emergency care may be needed'
            };
        } else if (moderateKeywords.some(keyword => symptomsLower.includes(keyword))) {
            return {
                level: 'moderate',
                color: '#f59e0b',
                bgColor: '#fef3c7',
                borderColor: '#fbbf24',
                icon: Info,
                message: 'Moderate symptoms detected - Medical consultation recommended',
                recommendation: 'Schedule a doctor visit soon'
            };
        } else {
            return {
                level: 'mild',
                color: '#10b981',
                bgColor: '#d1fae5',
                borderColor: '#34d399',
                icon: Shield,
                message: 'Mild symptoms detected - Monitor and rest',
                recommendation: 'Home care may be sufficient'
            };
        }
    };

    if (!symptoms || symptoms.length < 10) return null;

    const severity = getSeverityLevel(symptoms);
    const Icon = severity.icon;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
                background: severity.bgColor,
                border: `1px solid ${severity.borderColor}`,
                borderRadius: '12px',
                padding: '1rem',
                marginTop: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
            }}
        >
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: severity.color,
                color: 'white'
            }}>
                <Icon size={18} />
            </div>
            <div style={{ flex: 1 }}>
                <div style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: severity.color,
                    marginBottom: '0.25rem'
                }}>
                    {severity.message}
                </div>
                <div style={{
                    fontSize: '0.8rem',
                    color: severity.color,
                    opacity: 0.8
                }}>
                    {severity.recommendation}
                </div>
            </div>
        </motion.div>
    );
};

export default SymptomSeverityIndicator;
