import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingButton from './FloatingButton';

const Layout = ({ children }) => (
  <>
    <Header />
    {children}
    <FloatingButton />
    <Footer />
  </>
);

export default Layout;
