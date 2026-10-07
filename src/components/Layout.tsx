import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { X } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export default function Layout({ children, darkMode, setDarkMode }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-200">
      
      {/* 1. Top bar Header */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* 2. Workspace Body (Responsive sidebar + content field) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Desktop Sidebar (Permanent block) */}
        <div className="hidden lg:block h-full">
          <Sidebar />
        </div>

        {/* Mobile Sidebar overlay Drawer */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 z-50 lg:hidden bg-slate-900/40 backdrop-blur-xs flex"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div 
              className="w-64 h-full bg-white dark:bg-slate-800 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button Inside mobile drawer */}
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
              <Sidebar onClose={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        )}

        {/* 3. Primary Workspace Container */}
        <main className="flex-1 overflow-y-auto bg-[#F9FAFB] dark:bg-slate-900 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto w-full h-full animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
