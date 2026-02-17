
import React from 'react';
import Header from './Header'; // Keeping Header/Footer for structure if they exist, otherwise will need to check.
import Footer from './Footer';

const Layout = ({ children, showHeader = true, showFooter = true }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-bg-body)' }}>
            {showHeader && <Header />}

            <main style={{ flex: 1, position: 'relative', width: '100%' }}>
                {children}
            </main>

            {showFooter && <Footer />}
        </div>
    );
};

export default Layout;
