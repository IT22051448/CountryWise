import React from 'react';
import {
  FaGithub,
  FaTwitter,
  FaFacebook,
  FaExternalLinkAlt,
  FaGlobe,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-8 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between space-y-6 md:space-y-0">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start">
              <FaGlobe className="text-2xl mr-2" />
              <span className="text-xl font-bold">CountryWise</span>
            </div>
            <p className="mt-2 text-sm text-white/80">
              © {new Date().getFullYear()} CountryWise. All rights reserved.
            </p>
          </div>

          {/* Attribution */}
          <div className="text-center md:text-left">
            <p className="text-sm font-medium mb-2">Powered by</p>
            <a
              href="https://restcountries.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition"
            >
              <span className="mr-1">REST Countries API</span>
              <FaExternalLinkAlt className="text-xs" />
            </a>
          </div>

          {/* Social */}
          <div className="flex space-x-4">
            {[
              { Icon: FaGithub, label: 'GitHub', href: '#' },
              { Icon: FaFacebook, label: 'Facebook', href: '#' },
              { Icon: FaTwitter, label: 'Twitter', href: '#' },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
