import React from 'react';
import { FaGlobeAmericas, FaTimes } from 'react-icons/fa';

const CountrySelectModal = ({ matches, onSelect, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
    <div className="bg-white p-4 sm:p-6 rounded-xl w-full sm:w-96 max-w-[95vw] max-h-[90vh] shadow-2xl border border-green-100 overflow-y-auto relative">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        aria-label="Close modal"
      >
        <FaTimes size={18} />
      </button>

      <div className="flex items-center mb-3 sm:mb-4">
        <FaGlobeAmericas className="text-blue-500 mr-2" size={18} />
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">
          Select Your Country
        </h3>
      </div>

      <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">
        Multiple countries match your search. Please select the required one:
      </p>

      <ul className="space-y-2 sm:space-y-3 max-h-[60vh] overflow-y-auto pr-2">
        {matches.map((country) => (
          <li key={country.cca3}>
            <button
              onClick={() => onSelect(country)}
              className="w-full text-left px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-all
                        bg-gradient-to-r from-blue-50 to-green-50 hover:from-blue-100 hover:to-green-100
                        border border-gray-200 hover:border-blue-300
                        text-gray-800 hover:text-blue-700
                        flex items-center text-sm sm:text-base"
            >
              {country.flag && (
                <span className="mr-2 sm:mr-3 text-lg">{country.flag}</span>
              )}
              <span className="font-medium">{country.name.common}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default CountrySelectModal;
