import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Main content area with left margin to account for fixed sidebar */}
      <div className="ml-64 min-h-screen bg-white">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export { Layout };