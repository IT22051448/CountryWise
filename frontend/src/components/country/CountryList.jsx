import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaMapMarkerAlt,
  FaUsers,
  FaMoneyBillWave,
  FaLanguage,
  FaHeart,
  FaBookmark,
} from 'react-icons/fa';
import {
  fetchVisited,
  fetchWishlist,
  addVisited,
  removeVisited,
  addWishlist,
  removeWishlist,
} from '@/redux/countryList/countryListSlice';

export default function CountryList({ countries, onCardClick }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = Boolean(token);

  const visitedList = useSelector((state) => state.collection.visited);
  const wishlistList = useSelector((state) => state.collection.wishlist);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchVisited());
      dispatch(fetchWishlist());
    }
  }, [isLoggedIn, dispatch]);

  const handleToggleVisited = (e, country) => {
    e.stopPropagation();
    const name = country.name.common;
    if (visitedList.includes(name)) {
      dispatch(removeVisited(name));
    } else {
      dispatch(addVisited(name));
    }
  };

  const handleToggleWishlist = (e, country) => {
    e.stopPropagation();
    const name = country.name.common;
    if (wishlistList.includes(name)) {
      dispatch(removeWishlist(name));
    } else {
      dispatch(addWishlist(name));
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-6">
      {countries.map((country) => {
        const name = country.name.common;
        const visited = visitedList.includes(name);
        const wished = wishlistList.includes(name);

        return (
          <motion.div
            key={country.cca3}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={() => onCardClick(country)}
            className="cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200"
          >
            {/* Flag & Region */}
            <div className="relative h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-2">
              <img
                src={country.flags.svg}
                alt={`Flag of ${name}`}
                className="h-full object-contain"
              />
              <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {country.region}
              </div>
            </div>

            {/* Info & Actions */}
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-bold text-gray-800">{name}</h2>
                {isLoggedIn && (
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => handleToggleVisited(e, country)}
                      aria-label="Toggle visited"
                      className="transition-colors"
                    >
                      <FaHeart
                        className={`text-lg ${
                          visited
                            ? 'text-red-500'
                            : 'text-gray-400 hover:text-red-500'
                        }`}
                      />
                    </button>
                    <button
                      onClick={(e) => handleToggleWishlist(e, country)}
                      aria-label="Toggle wishlist"
                      className="transition-colors"
                    >
                      <FaBookmark
                        className={`text-lg ${
                          wished
                            ? 'text-blue-500'
                            : 'text-gray-400 hover:text-blue-500'
                        }`}
                      />
                    </button>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="w-4 h-4 mt-0.5 mr-2 text-blue-500" />
                    <div>
                      <p className="text-xs text-gray-500">Capital</p>
                      <p className="text-sm font-medium">
                        {country.capital?.[0] || 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaUsers className="w-4 h-4 mt-0.5 mr-2 text-blue-500" />
                    <div>
                      <p className="text-xs text-gray-500">Population</p>
                      <p className="text-sm font-medium">
                        {country.population.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {country.languages && (
                    <div className="flex items-start">
                      <FaLanguage className="w-4 h-4 mt-0.5 mr-2 text-blue-500" />
                      <div>
                        <p className="text-xs text-gray-500">Languages</p>
                        <p className="text-sm font-medium">
                          {Object.values(country.languages)
                            .slice(0, 2)
                            .join(', ')}
                          {Object.values(country.languages).length > 2
                            ? '...'
                            : ''}
                        </p>
                      </div>
                    </div>
                  )}
                  {country.currencies && (
                    <div className="flex items-start">
                      <FaMoneyBillWave className="w-4 h-4 mt-0.5 mr-2 text-blue-500" />
                      <div>
                        <p className="text-xs text-gray-500">Currency</p>
                        <p className="text-sm font-medium">
                          {Object.values(country.currencies)
                            .map(
                              (c) =>
                                `${c.name}${c.symbol ? ` (${c.symbol})` : ''}`
                            )
                            .slice(0, 1)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
