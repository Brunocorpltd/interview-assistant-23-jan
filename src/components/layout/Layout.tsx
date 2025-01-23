import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MobileMenu from './MobileMenu';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 md:hidden z-50">
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        />
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed md:sticky top-0 left-0 h-screen w-[240px] shrink-0 transform transition-transform duration-200 ease-in-out z-40 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 w-0 min-h-screen">
        <div className="p-4 pt-16 md:p-8 md:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}