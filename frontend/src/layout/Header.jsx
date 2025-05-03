import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/redux/auth/authSlice';
import { FaGlobeAmericas, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

const Header = () => {
  const dispatch = useDispatch();
  const { token, expiry } = useSelector((state) => state.auth);

  const loggedIn =
    Boolean(token) && Boolean(expiry) && Date.now() < Number(expiry);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Branding */}
        <Link to="/" className="flex items-center group">
          <div className="relative mr-3">
            <FaGlobeAmericas className="text-3xl text-blue-400 group-hover:text-blue-300 transition-colors duration-200" />
            <div className="absolute -inset-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-white">COUNTRYWISE</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link
            to="/countries"
            className="text-gray-300 hover:text-blue-400 font-medium transition duration-200 flex items-center group"
          >
            <span className="mr-1">🌎</span>
            Countries
          </Link>
          {loggedIn && (
            <Link
              to="/collection"
              className="text-gray-300 hover:text-blue-400 font-medium transition duration-200 flex items-center group"
            >
              <span className="mr-1">📚</span>
              Collection
            </Link>
          )}
          <Link
            to="/globe-view"
            className="text-gray-300 hover:text-blue-400 font-medium transition duration-200 flex items-center group"
          >
            <span className="mr-1">🔄</span>
            Globe View
          </Link>
          <Link
            to="/about"
            className="text-gray-300 hover:text-blue-400 font-medium transition duration-200 flex items-center group"
          >
            <span className="mr-1">ℹ️</span>
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-gray-300 hover:text-blue-400 font-medium transition duration-200 flex items-center group"
          >
            <span className="mr-1">✉️</span>
            Contact Us
          </Link>
        </nav>

        {/* Login/Logout Button */}
        <div className="flex items-center">
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-700 hover:to-red-600 transition-all duration-200 flex items-center shadow-md"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-200 flex items-center shadow-md"
            >
              <FaSignInAlt className="mr-2" />
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
