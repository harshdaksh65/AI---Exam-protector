import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Profile from './Profile';
import { IconBellRinging, IconMenu } from '@tabler/icons-react';
import { useSelector } from 'react-redux';

const Header = (props) => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-md backdrop-blur-md">
      <div className="flex items-center px-4 py-3 min-h-[70px]">
        {/* Mobile Sidebar Toggle */}
        <button
          type="button"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          className="lg:hidden inline-flex items-center justify-center text-gray-700 dark:text-gray-200 mr-2"
        >
          <IconMenu width="20" height="20" />
        </button>
        {/* Notification Bell */}
        <button
          type="button"
          aria-label="show notifications"
          className="relative text-gray-700 dark:text-gray-200 mr-2"
        >
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-blue-500"></span>
          <IconBellRinging size="21" stroke="1.5" />
        </button>
        <div className="flex-grow" />
        <div className="flex items-center space-x-2">
          <span className="text-blue-600 dark:text-blue-400 font-semibold">
            Hello, {_.startCase(userInfo.name)}
          </span>
          <Profile />
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
  toggleMobileSidebar: PropTypes.func,
};

export default Header;
