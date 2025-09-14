import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconListCheck, IconMail, IconUser } from '@tabler/icons-react';
import ProfileImg from 'src/assets/images/profile/user-1.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './../../../slices/authSlice';
import { useLogoutMutation } from './../../../slices/usersApiSlice';

const Profile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/auth/login');
    } catch (err) {
      console.error(err);
    }
  };

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        ref={buttonRef}
        type="button"
        aria-label="profile menu"
        className="inline-flex items-center justify-center focus:outline-none"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <img
          src={ProfileImg}
          alt="Profile"
          className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-700 shadow"
        />
      </button>
      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-900 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-800">
          <Link to="/user/profile" className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <IconUser width={20} className="mr-2 text-blue-600" />
            <span className="text-sm">My Profile</span>
          </Link>
          <Link to="/user/account" className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <IconMail width={20} className="mr-2 text-blue-600" />
            <span className="text-sm">My Account</span>
          </Link>
          <Link to="/user/tasks" className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <IconListCheck width={20} className="mr-2 text-blue-600" />
            <span className="text-sm">My Tasks</span>
          </Link>
          <div className="px-4 py-2">
            <button
              type="button"
              onClick={logoutHandler}
              className="w-full py-2 px-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
