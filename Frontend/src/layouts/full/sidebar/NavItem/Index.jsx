import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const NavItem = ({ item, level, pathDirect, onClick }) => {
  const Icon = item.icon;
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

  return (
    <li key={item.id} className="list-none">
      <NavLink
        to={item.href}
        href={item.external ? item.href : undefined}
        target={item.external ? '_blank' : undefined}
        onClick={onClick}
        className={({ isActive }) =>
          `flex items-center gap-3 whitespace-nowrap mb-1 px-2 py-2 rounded-lg transition-colors duration-200
          ${level > 1 ? '' : 'bg-inherit'}
          ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700'}
          ${isActive || pathDirect === item.href ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-200'}
          `
        }
        disabled={item.disabled}
      >
        <span className="min-w-[36px] py-1 text-inherit flex items-center justify-center">
          {itemIcon}
        </span>
        <span className="text-sm font-medium">
          {item.title}
        </span>
      </NavLink>
    </li>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
  pathDirect: PropTypes.any,
  onClick: PropTypes.func,
};

export default NavItem;
