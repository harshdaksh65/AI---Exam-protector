import React from 'react';
import Logo from '../shared/logo/Logo';
import SidebarItems from './SidebarItems';

const sidebarWidth = '270px';

const Sidebar = (props) => {
  // Responsive: md breakpoint
  const isDesktop = window.matchMedia('(min-width: 768px)').matches;

  if (isDesktop) {
    return (
      <aside
        className="flex-shrink-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800"
        style={{ width: sidebarWidth }}
      >
        {/* Logo */}
        <div className="px-6 py-4">
          <Logo />
        </div>
        {/* Sidebar Items */}
        <div className="px-2">
          <SidebarItems />
        </div>
      </aside>
    );
  }

  // Mobile sidebar
  return (
    <div
      className={`fixed inset-0 z-50 transition-transform duration-300 ${props.isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      style={{ width: sidebarWidth, background: 'white' }}
      role="dialog"
      aria-modal="true"
    >
      <div className="px-4 py-4 border-b border-gray-200">
        <Logo />
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={props.onSidebarClose}
          aria-label="Close sidebar"
        >
          &times;
        </button>
      </div>
      <div className="px-2">
        <SidebarItems />
      </div>
    </div>
  );
};

export default Sidebar;
