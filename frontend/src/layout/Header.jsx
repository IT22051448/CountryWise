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

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((open) => !open);
  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
  };

  const linkClasses =
    'block px-4 py-2 text-gray-300 hover:text-blue-400 font-medium transition flex items-center';

  return (
    <header className="bg-gray-800 shadow-lg fixed w-full z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <FaGlobeAmericas className="text-3xl text-blue-400 mr-2" />
          <span className="text-xl font-bold text-white">COUNTRYWISE</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-6 lg:space-x-8">
          <Link to="/countries" className={linkClasses}>
            <span className="mr-1">🌎</span> Countries
          </Link>
          {loggedIn && (
            <Link to="/collection" className={linkClasses}>
              <span className="mr-1">📚</span> Collection
            </Link>
          )}
          <Link to="/globe-view" className={linkClasses}>
            <span className="mr-1">🔄</span> Globe View
          </Link>
          <Link to="/about" className={linkClasses}>
            <span className="mr-1">ℹ️</span> About Us
          </Link>
          <Link to="/contact" className={linkClasses}>
            <span className="mr-1">✉️</span> Contact Us
          </Link>
        </nav>

        {/* Desktop login/logout */}
        <div className="hidden md:flex items-center">
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="ml-4 flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-700 hover:to-red-600 transition"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="ml-4 flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition"
            >
              <FaSignInAlt className="mr-2" /> Login
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/countries"
              onClick={() => setMenuOpen(false)}
              className={linkClasses}
            >
              🌎 Countries
            </Link>
            {loggedIn && (
              <Link
                to="/collection"
                onClick={() => setMenuOpen(false)}
                className={linkClasses}
              >
                📚 Collection
              </Link>
            )}
            <Link
              to="/globe-view"
              onClick={() => setMenuOpen(false)}
              className={linkClasses}
            >
              🔄 Globe View
            </Link>
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className={linkClasses}
            >
              ℹ️ About Us
            </Link>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className={linkClasses}
            >
              ✉️ Contact Us
            </Link>
            {loggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-400 hover:text-red-600 transition flex items-center"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 text-blue-400 hover:text-blue-600 transition flex items-center"
              >
                <FaSignInAlt className="mr-2" /> Login
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
