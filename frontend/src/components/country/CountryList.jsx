import React, { useEffect, useState } from 'react';
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
import { useToast } from '@/hooks/ToastContext';

export default function CountryList({ countries, onCardClick }) {
  const { addToast } = useToast();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = Boolean(token);
  const visitedList = useSelector((state) => state.collection.visited);
  const wishlistList = useSelector((state) => state.collection.wishlist);

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20;
  const totalPages = Math.ceil(countries.length / perPage);

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
      addToast({ type: 'info', message: `${name} removed from visited.` });
    } else {
      dispatch(addVisited(name));
      addToast({ type: 'info', message: `${name} added to visited.` });
    }
  };

  const handleToggleWishlist = (e, country) => {
    e.stopPropagation();
    const name = country.name.common;
    if (wishlistList.includes(name)) {
      dispatch(removeWishlist(name));
      addToast({ type: 'info', message: `${name} removed from wishlist.` });
    } else {
      dispatch(addWishlist(name));
      addToast({ type: 'info', message: `${name} added to wishlist.` });
    }
  };

  const start = (currentPage - 1) * perPage;
  const visible = countries.slice(start, start + perPage);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
        {visible.map((country) => {
          const name = country.name.common;
          const visited = visitedList.includes(name);
          const wished = wishlistList.includes(name);

          return (
            <motion.div
              key={country.cca3}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => onCardClick(country)}
              className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden border border-gray-200"
            >
              {/* Flag & Region */}
              <div className="relative h-40 sm:h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-2">
                <img
                  src={country.flags.svg}
                  alt={`Flag of ${name}`}
                  className="h-full object-contain"
                />
                <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {country.region}
                </span>
              </div>

              {/* Info & Actions */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-bold text-gray-800 truncate">
                    {name}
                  </h2>
                  {isLoggedIn && (
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => handleToggleVisited(e, country)}
                        aria-label="Toggle visited"
                      >
                        <FaHeart
                          className={`text-xl transition-colors ${
                            visited
                              ? 'text-red-500'
                              : 'text-gray-400 hover:text-red-500'
                          }`}
                        />
                      </button>
                      <button
                        onClick={(e) => handleToggleWishlist(e, country)}
                        aria-label="Toggle wishlist"
                      >
                        <FaBookmark
                          className={`text-xl transition-colors ${
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
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="mt-0.5 mr-2 text-blue-500" />
                    <div>
                      <p className="font-medium">
                        {country.capital?.[0] || 'N/A'}
                      </p>
                      <p className="text-xs text-gray-500">Capital</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaUsers className="mt-0.5 mr-2 text-blue-500" />
                    <div>
                      <p className="font-medium">
                        {country.population.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">Population</p>
                    </div>
                  </div>
                  {country.languages && (
                    <div className="flex items-start">
                      <FaLanguage className="mt-0.5 mr-2 text-blue-500" />
                      <div>
                        <p className="font-medium truncate">
                          {Object.values(country.languages)
                            .slice(0, 2)
                            .join(', ')}
                          {Object.values(country.languages).length > 2 && '...'}
                        </p>
                        <p className="text-xs text-gray-500">Languages</p>
                      </div>
                    </div>
                  )}
                  {country.currencies && (
                    <div className="flex items-start">
                      <FaMoneyBillWave className="mt-0.5 mr-2 text-blue-500" />
                      <div>
                        <p className="font-medium">
                          {Object.values(country.currencies)
                            .map(
                              (c) =>
                                `${c.name}${c.symbol ? ` (${c.symbol})` : ''}`
                            )
                            .slice(0, 1)}
                        </p>
                        <p className="text-xs text-gray-500">Currency</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center space-x-2 my-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-3 py-1 text-sm rounded-md transition ${
                num === currentPage
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
