import React from 'react';
import {
  FaGithub,
  FaTwitter,
  FaGlobe,
  FaFacebook,
  FaExternalLinkAlt,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand and copyright */}
          <div className="mb-6 md:mb-0">
            <div className="flex items-center justify-center md:justify-start">
              <FaGlobe className="text-2xl mr-2 text-white" />
              <span className="text-xl font-bold">CountryWise</span>
            </div>
            <p className="mt-2 text-sm text-white/80">
              © {new Date().getFullYear()} CountryWise. All rights reserved.
            </p>
          </div>

          {/* API Attribution */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <p className="text-sm font-medium mb-2">Powered by</p>
            <a
              href="https://restcountries.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-all"
            >
              <span className="mr-1">REST Countries API</span>
              <FaExternalLinkAlt className="text-xs" />
            </a>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            <a
              href="#"
              className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="#"
              className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
              aria-label="FaceBook"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
