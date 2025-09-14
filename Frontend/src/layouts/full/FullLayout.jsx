import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';

const FullLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      {/* Main Content */}
      <div className="flex flex-col flex-grow z-10 bg-transparent pb-16">
        {/* Header */}
        <Header
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
        />
        {/* Page Content */}
        <div className="px-6 pt-5 max-w-5xl w-full mx-auto">
          <div className="min-h-[calc(100vh-170px)]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullLayout;
