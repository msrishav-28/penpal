import React, { ReactNode } from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Header />
      <main className="relative">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;