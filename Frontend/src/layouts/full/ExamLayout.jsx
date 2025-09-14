import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';

const ExamLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col bg-black z-10 pb-16">
      {/* Header */}
      <Header
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        toggleMobileSidebar={() => setMobileSidebarOpen(true)}
      />
      {/* Page Content */}
      <div className="flex-grow flex flex-col">
        <Outlet />
      </div>
    </div>
  );
};

export default ExamLayout;
