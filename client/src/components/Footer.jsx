import React from 'react';
import { Mail, Phone, Linkedin, Twitter, Heart, Stethoscope } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: '#0f172a',
            color: '#cbd5e1',
            padding: '4rem 2rem 2rem',
            marginTop: 'auto',
            borderTop: '1px solid #1e293b'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                marginBottom: '3rem'
            }}>
                {/* Branding */}
                <div>
                    <div style={{ fontSize: '1.125rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Heart size={20} style={{ color: '#10b981' }} />
                        HealthAI Assistant
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6 }}>
                        AI-powered symptom analysis and health insights for better wellness decisions.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 style={{ color: '#ffffff', fontWeight: '600', marginBottom: '1rem', fontSize: '0.95rem' }}>Health Services</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li><a href="#" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.9rem', lineHeight: 1.8 }}>Symptom Analysis</a></li>
                        <li><a href="#" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.9rem', lineHeight: 1.8 }}>Health Forecast</a></li>
                        <li><a href="#" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.9rem', lineHeight: 1.8 }}>Hospital Finder</a></li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h4 style={{ color: '#ffffff', fontWeight: '600', marginBottom: '1rem', fontSize: '0.95rem' }}>Medical Info</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li><a href="#" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.9rem', lineHeight: 1.8 }}>About HealthAI</a></li>
                        <li><a href="#" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.9rem', lineHeight: 1.8 }}>Health Blog</a></li>
                        <li><a href="#" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.9rem', lineHeight: 1.8 }}>Medical Team</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 style={{ color: '#ffffff', fontWeight: '600', marginBottom: '1rem', fontSize: '0.95rem' }}>Emergency Contact</h4>
                    <div style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Mail size={16} /> <a href="mailto:support@healthai.com" style={{ color: '#cbd5e1', textDecoration: 'none' }}>support@healthai.com</a>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Phone size={16} /> <a href="tel:911" style={{ color: '#ef4444', textDecoration: 'none', fontWeight: '600' }}>Emergency: 911</a>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Stethoscope size={16} /> <span style={{ color: '#cbd5e1' }}>24/7 Health Support</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div style={{
                borderTop: '1px solid #1e293b',
                paddingTop: '2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '2rem'
            }}>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>© 2026 HealthAI Assistant. All rights reserved.</p>
                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem' }}>
                    <a href="#" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Privacy Policy</a>
                    <a href="#" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Medical Disclaimer</a>
                    <a href="#" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Terms of Service</a>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <a href="#" style={{ color: '#cbd5e1', display: 'flex', alignItems: 'center' }}><Linkedin size={18} /></a>
                    <a href="#" style={{ color: '#cbd5e1', display: 'flex', alignItems: 'center' }}><Twitter size={18} /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
