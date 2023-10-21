import React from 'react';
import Navbar from './Navbar';
import Footer from './Fotter';

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                {children}
            </div>
            <Footer style={{ paddingBottom: 'auto' }} />
        </div>
    );
};

export default Layout;
