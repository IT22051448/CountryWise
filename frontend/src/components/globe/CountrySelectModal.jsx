import React from 'react';
import { FaGlobeAmericas } from 'react-icons/fa';

const CountrySelectModal = ({ matches, onSelect }) => (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
    <div className="bg-white p-6 rounded-xl w-full max-w-sm sm:max-w-md shadow-2xl border border-green-100 overflow-y-auto max-h-[80vh]">
      <div className="flex items-center mb-4">
        <FaGlobeAmericas className="text-blue-500 mr-2" size={20} />
        <h3 className="text-xl font-bold text-gray-800">Select Your Country</h3>
      </div>

      <p className="text-gray-600 mb-4 text-sm">
        Multiple countries match your search. Please select one:
      </p>

      <ul className="space-y-3">
        {matches.map((country) => (
          <li key={country.cca3}>
            <button
              onClick={() => onSelect(country)}
              className="w-full text-left px-4 py-3 rounded-lg transition-all
                         bg-gradient-to-r from-blue-50 to-green-50 hover:from-blue-100 hover:to-green-100
                         border border-gray-200 hover:border-blue-300
                         text-gray-800 hover:text-blue-700 flex items-center"
            >
              {country.flag && (
                <span className="mr-3 text-xl">{country.flag}</span>
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
