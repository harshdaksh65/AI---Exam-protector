import React from 'react';
import Menuitems from './MenuItems';
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';
import { useSelector } from 'react-redux';

const SidebarItems = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const pathDirect = pathname;

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map((item) => {
          // Hide teacher-only items for students
          if (
            userInfo.role === 'student' &&
            ['Create Exam', 'Add Questions', 'Exam Logs'].includes(item.title)
          ) {
            return null;
          }
          // Hide student-only items for teachers
          if (
            userInfo.role === 'teacher' &&
            item.title === 'Result'
          ) {
            return null;
          }
          // Hide "Teacher" subheader for students
          if (item.subheader) {
            if (userInfo.role === 'student' && item.subheader === 'Teacher') {
              return null;
            }
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            return <NavItem item={item} key={item.id} pathDirect={pathDirect} />;
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
