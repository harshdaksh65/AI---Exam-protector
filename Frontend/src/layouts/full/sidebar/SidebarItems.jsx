import React from 'react';
import Menuitems from './MenuItems';
import { useLocation } from 'react-router';
import NavItem from './NavItem/Index';
import NavGroup from './NavGroup/NavGroup';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;

  return (
    <nav className="px-6 pt-0 sidebarNav">
      <ul className="space-y-1">
        {Menuitems.map((item) => {
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            return (
              <NavItem item={item} key={item.id} pathDirect={pathDirect} />
            );
          }
        })}
      </ul>
    </nav>
  );
};
export default SidebarItems;
