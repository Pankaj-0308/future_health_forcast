
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header style={{
      background: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            borderRadius: '8px',
            color: 'white'
          }}>
            <Heart size={18} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontSize: '1.125rem', fontWeight: '700', letterSpacing: '-0.01em', color: '#0f172a' }}>
              HealthAI Assistant
            </div>
            <div style={{ fontSize: '0.65rem', fontWeight: '600', color: '#10b981', letterSpacing: '0.05em' }}>AI HEALTHCARE</div>
          </div>
        </div>
      </Link>
      <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link
          to="/"
          style={{
            color: '#64748b',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '0.9rem',
            transition: 'color 0.2s',
            borderBottom: '2px solid transparent',
            paddingBottom: '0.25rem'
          }}
          onMouseEnter={(e) => e.target.style.color = '#10b981'}
          onMouseLeave={(e) => e.target.style.color = '#64748b'}
        >
          Symptom Check
        </Link>
        <a
          href="#features"
          style={{
            color: '#64748b',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '0.9rem',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.color = '#10b981'}
          onMouseLeave={(e) => e.target.style.color = '#64748b'}
        >
          Health Services
        </a>
        <a
          href="#contact"
          style={{
            color: '#64748b',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '0.9rem',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.color = '#10b981'}
          onMouseLeave={(e) => e.target.style.color = '#64748b'}
        >
          Emergency
        </a>
      </nav>
    </header>
  );
};

export default Header;

