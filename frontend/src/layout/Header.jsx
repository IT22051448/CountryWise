import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/redux/auth/authSlice';
import {
  FaGlobeAmericas,
  FaSignOutAlt,
  FaSignInAlt,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

const Header = () => {
  const dispatch = useDispatch();
  const { token, expiry } = useSelector((state) => state.auth);

  const loggedIn =
    Boolean(token) && Boolean(expiry) && Date.now() < Number(expiry);

  const handleLogout = () => {
    dispatch(logout());
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const NavLinks = (
    <>
      <Link
        to="/countries"
        className="text-gray-300 hover:text-blue-400 font-medium transition duration-200 flex items-center mb-4 md:mb-0"
      >
        <span className="mr-1">🌎</span>
        Countries
      </Link>
      {loggedIn && (
        <Link
          to="/collection"
          className="text-gray-300 hover:text-blue-400 font-medium transition duration-200 flex items-center mb-4 md:mb-0"
        >
          <span className="mr-1">📚</span>
          Collection
        </Link>
      )}
      <Link
        to="/globe-view"
        className="text-gray-300 hover:text-blue-400 font-medium transition duration-200 flex items-center mb-4 md:mb-0"
      >
        <span className="mr-1">🔄</span>
        Globe View
      </Link>
      <Link
        to="/about"
        className="text-gray-300 hover:text-blue-400 font-medium transition duration-200 flex items-center mb-4 md:mb-0"
      >
        <span className="mr-1">ℹ️</span>
        About Us
      </Link>
      <Link
        to="/contact"
        className="text-gray-300 hover:text-blue-400 font-medium transition duration-200 flex items-center"
      >
        <span className="mr-1">✉️</span>
        Contact Us
      </Link>
    </>
  );

  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <div className="relative mr-3">
            <FaGlobeAmericas className="text-3xl text-blue-400 group-hover:text-blue-300 transition-colors duration-200" />
            <div className="absolute -inset-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300" />
          </div>
          <span className="text-xl font-bold text-white">COUNTRYWISE</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-8 items-center">{NavLinks}</nav>

        {/* Auth button */}
        <div className="hidden md:flex items-center">
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

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-4 pb-4">
          <nav className="flex flex-col">
            {NavLinks}
            <div className="flex items-center mt-2">
              {loggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-white font-medium flex items-center"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="w-full text-left px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white font-medium flex items-center"
                >
                  <FaSignInAlt className="mr-2" />
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
