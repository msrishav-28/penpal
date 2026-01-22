import React, { ReactNode } from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import { NoiseOverlay, LanternCursor } from './ui';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Layout - Ethereal Archive main wrapper
 * Includes dark void background, noise overlay, lantern cursor, and glass navigation
 */
const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-void relative overflow-x-hidden">
      {/* Atmospheric Effects */}
      <LanternCursor />
      <NoiseOverlay />

      {/* Gradient Orbs for depth */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-accent-violet/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-accent-fuchsia/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 left-1/3 w-72 h-72 bg-accent-violet/8 rounded-full blur-[100px]" />
      </div>

      {/* Main Content */}
      <Header />
      <main className="relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;