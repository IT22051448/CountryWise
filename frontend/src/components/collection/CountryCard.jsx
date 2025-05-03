import React from 'react';
import { motion } from 'framer-motion';
import {
  FaHeart,
  FaBookmark,
  FaMapMarkerAlt,
  FaUsers,
  FaLanguage,
  FaMoneyBillWave,
} from 'react-icons/fa';
import { useGetCountriesByExactNameQuery } from '@/api/restCountriesApi';

export default function CountryCard({
  countryName,
  isVisited,
  isWishlisted,
  onToggleVisited,
  onToggleWishlist,
}) {
  const { data, isLoading, isError } =
    useGetCountriesByExactNameQuery(countryName);

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center bg-white rounded-lg shadow-sm">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }
  if (isError || !data?.length) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm text-center">
        <p className="text-gray-500">Could not load {countryName}</p>
      </div>
    );
  }

  const country = data[0];
  const flag = country.flags.svg;
  const capital = country.capital?.[0] || 'N/A';
  const population = country.population.toLocaleString();
  const languages = country.languages
    ? Object.values(country.languages).slice(0, 2).join(', ')
    : 'N/A';
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => `${c.name}${c.symbol ? ` (${c.symbol})` : ''}`)
        .slice(0, 1)
        .join(', ')
    : 'N/A';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative h-40 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-2">
        <img
          src={flag}
          alt={`Flag of ${countryName}`}
          className="h-full object-contain"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={(e) => onToggleVisited(e, countryName)}
            aria-label={isVisited ? 'Remove from visited' : 'Add to visited'}
            className="p-2 bg-white rounded-full shadow-sm hover:bg-red-50 transition"
          >
            <FaHeart className={isVisited ? 'text-red-500' : 'text-gray-400'} />
          </button>
          <button
            onClick={(e) => onToggleWishlist(e, countryName)}
            aria-label={
              isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'
            }
            className="p-2 bg-white rounded-full shadow-sm hover:bg-blue-50 transition"
          >
            <FaBookmark
              className={isWishlisted ? 'text-blue-500' : 'text-gray-400'}
            />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
          {countryName}
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-start">
            <FaMapMarkerAlt className="w-3.5 h-3.5 mt-0.5 mr-1.5 text-blue-500" />
            <div>
              <p className="text-xs text-gray-500">Capital</p>
              <p className="font-medium">{capital}</p>
            </div>
          </div>
          <div className="flex items-start">
            <FaUsers className="w-3.5 h-3.5 mt-0.5 mr-1.5 text-blue-500" />
            <div>
              <p className="text-xs text-gray-500">Population</p>
              <p className="font-medium">{population}</p>
            </div>
          </div>
          <div className="flex items-start col-span-2">
            <FaLanguage className="w-3.5 h-3.5 mt-0.5 mr-1.5 text-blue-500" />
            <div>
              <p className="text-xs text-gray-500">Languages</p>
              <p className="font-medium">{languages}</p>
            </div>
          </div>
          <div className="flex items-start col-span-2">
            <FaMoneyBillWave className="w-3.5 h-3.5 mt-0.5 mr-1.5 text-blue-500" />
            <div>
              <p className="text-xs text-gray-500">Currency</p>
              <p className="font-medium">{currencies}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
