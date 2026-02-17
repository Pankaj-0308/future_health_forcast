import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, MapPin, Activity, Calendar, User } from 'lucide-react';
import SymptomSeverityIndicator from './SymptomSeverityIndicator';

const SymptomForm = ({ onSubmit, isLoading }) => {
    const [formData, setFormData] = useState({
        patientName: '',
        age: '',
        gender: '',
        location: '',
        symptoms: '',
        duration: '',
        medicalHistory: '',
        lifestyle: ''
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

    const symptomsLength = formData.symptoms.length;
    const isSymptomsValid = symptomsLength >= 30;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2.5rem',
                maxWidth: '700px',
                margin: '0 auto',
                boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0'
            }}
        >
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', color: '#0f172a', fontSize: '2rem' }}>
                    Health Symptom Analysis
                </h2>
                <p style={{ textAlign: 'center', color: '#64748b', marginBottom: 0 }}>
                    Get AI-powered health insights and find nearby medical facilities
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Patient Information */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={{ color: '#0f172a', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ color: '#2563eb' }}>*</span> Name
                        </label>
                        <input
                            name="patientName"
                            value={formData.patientName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="John Doe"
                            required
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '0.875rem',
                                background: '#f8fafc',
                                border: formData.patientName ? '1px solid #2563eb' : '1px solid #e2e8f0',
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
                            <span style={{ color: '#2563eb' }}>*</span> Age
                        </label>
                        <input
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="25"
                            type="number"
                            min="1"
                            max="120"
                            required
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '0.875rem',
                                background: '#f8fafc',
                                border: formData.age ? '1px solid #2563eb' : '1px solid #e2e8f0',
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
                            <span style={{ color: '#2563eb' }}>*</span> Gender
                        </label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '0.875rem',
                                background: '#f8fafc',
                                border: formData.gender ? '1px solid #2563eb' : '1px solid #e2e8f0',
                                borderRadius: '8px',
                                color: '#0f172a',
                                fontSize: '1rem',
                                transition: 'all 0.2s',
                                fontFamily: 'inherit',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                {/* Location */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ color: '#0f172a', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <MapPin size={16} style={{ color: '#2563eb' }} />
                        <span style={{ color: '#2563eb' }}>*</span> Your Location
                    </label>
                    <input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g. New York, NY or London, UK"
                        required
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '0.875rem',
                            background: '#f8fafc',
                            border: formData.location ? '1px solid #2563eb' : '1px solid #e2e8f0',
                            borderRadius: '8px',
                            color: '#0f172a',
                            fontSize: '1rem',
                            transition: 'all 0.2s',
                            fontFamily: 'inherit'
                        }}
                    />
                </div>

                {/* Symptoms */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                        <label style={{ color: '#0f172a', fontWeight: '600', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Activity size={16} style={{ color: '#2563eb' }} />
                            <span style={{ color: '#2563eb' }}>*</span> Describe Your Symptoms
                        </label>
                        <span style={{ fontSize: '0.8rem', color: isSymptomsValid ? '#10b981' : '#ef4444' }}>
                            {symptomsLength}/30 characters
                        </span>
                    </div>
                    <textarea
                        name="symptoms"
                        value={formData.symptoms}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows="4"
                        placeholder="Describe all your symptoms in detail: headache, fever, fatigue, pain location, etc..."
                        required
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '0.875rem',
                            background: '#f8fafc',
                            border: isSymptomsValid ? '1px solid #2563eb' : symptomsLength > 0 ? '1px solid #ef4444' : '1px solid #e2e8f0',
                            borderRadius: '8px',
                            color: '#0f172a',
                            fontSize: '1rem',
                            transition: 'all 0.2s',
                            fontFamily: 'inherit',
                            resize: 'vertical'
                        }}
                    />
                    {symptomsLength > 0 && symptomsLength < 30 && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.85rem', color: '#ef4444' }}>
                            <AlertCircle size={16} /> Minimum 30 characters required
                        </div>
                    )}
                    {isSymptomsValid && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.85rem', color: '#10b981' }}>
                            <CheckCircle size={16} /> Ready to analyze
                        </div>
                    )}
                    
                    <SymptomSeverityIndicator symptoms={formData.symptoms} />
                </div>

                {/* Duration and Medical History */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={{ color: '#0f172a', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Calendar size={16} style={{ color: '#2563eb' }} />
                            Duration of Symptoms
                        </label>
                        <select
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '0.875rem',
                                background: '#f8fafc',
                                border: formData.duration ? '1px solid #2563eb' : '1px solid #e2e8f0',
                                borderRadius: '8px',
                                color: '#0f172a',
                                fontSize: '1rem',
                                transition: 'all 0.2s',
                                fontFamily: 'inherit',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="">Select Duration</option>
                            <option value="few hours">Few Hours</option>
                            <option value="1-2 days">1-2 Days</option>
                            <option value="3-7 days">3-7 Days</option>
                            <option value="1-2 weeks">1-2 Weeks</option>
                            <option value="2-4 weeks">2-4 Weeks</option>
                            <option value="1-3 months">1-3 Months</option>
                            <option value="3+ months">3+ Months</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ color: '#0f172a', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <User size={16} style={{ color: '#2563eb' }} />
                            Lifestyle
                        </label>
                        <select
                            name="lifestyle"
                            value={formData.lifestyle}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '0.875rem',
                                background: '#f8fafc',
                                border: formData.lifestyle ? '1px solid #2563eb' : '1px solid #e2e8f0',
                                borderRadius: '8px',
                                color: '#0f172a',
                                fontSize: '1rem',
                                transition: 'all 0.2s',
                                fontFamily: 'inherit',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="">Select Lifestyle</option>
                            <option value="sedentary">Sedentary</option>
                            <option value="lightly active">Lightly Active</option>
                            <option value="moderately active">Moderately Active</option>
                            <option value="very active">Very Active</option>
                            <option value="athlete">Athlete</option>
                        </select>
                    </div>
                </div>

                {/* Medical History */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ color: '#0f172a', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <User size={16} style={{ color: '#2563eb' }} />
                        Medical History (Optional)
                    </label>
                    <textarea
                        name="medicalHistory"
                        value={formData.medicalHistory}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows="3"
                        placeholder="Any pre-existing conditions, medications, allergies, or past surgeries..."
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '0.875rem',
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            color: '#0f172a',
                            fontSize: '1rem',
                            transition: 'all 0.2s',
                            fontFamily: 'inherit',
                            resize: 'vertical'
                        }}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading || !isSymptomsValid}
                    style={{
                        width: '100%',
                        padding: '1rem',
                        background: isLoading || !isSymptomsValid ? '#cbd5e1' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: isLoading || !isSymptomsValid ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s',
                        fontSize: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        boxShadow: isLoading || !isSymptomsValid ? 'none' : '0 4px 12px rgba(16, 185, 129, 0.3)'
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
                            Analyzing Symptoms...
                        </>
                    ) : (
                        '🏥 Get Health Analysis'
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

export default SymptomForm;
