import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTimes,
  FaMapMarkerAlt,
  FaUsers,
  FaGlobeAmericas,
  FaMoneyBillWave,
  FaLanguage,
  FaPhone,
  FaClock,
  FaLandmark,
} from 'react-icons/fa';

const CountryModal = ({ country, onClose }) => {
  if (!country) return null;

  const callingCode = country.idd
    ? `${country.idd.root}${country.idd.suffixes?.[0] || ''}`
    : 'N/A';

  const formatCurrencies = () =>
    country.currencies
      ? Object.entries(country.currencies)
          .map(([code, c]) => `${c.name} (${c.symbol || code})`)
          .join(', ')
      : 'N/A';

  const formatNativeNames = () =>
    country.name.nativeName
      ? Object.values(country.name.nativeName)
          .map((n) => n.common)
          .join(', ')
      : 'N/A';

  const formatBorders = () =>
    country.borders && country.borders.length
      ? country.borders.join(', ')
      : 'None';

  const InfoCard = ({ icon, title, value }) => (
    <div className="bg-gray-50 rounded-lg p-4 flex items-start">
      <div className="text-blue-500 mr-3 mt-1">{icon}</div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-gray-800 font-medium">{value}</p>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm p-4"
        style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white w-full max-w-md sm:max-w-xl lg:max-w-6xl mx-auto my-4 max-h-[calc(100vh-2rem)] overflow-y-auto rounded-xl shadow-2xl relative z-10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors z-20"
          >
            <FaTimes className="text-gray-600" />
          </button>

          <div className="flex flex-col lg:flex-row">
            {/* Flag */}
            <div className="w-full lg:w-2/5 bg-gray-100 flex items-center justify-center p-4 relative">
              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                className="max-h-48 sm:max-h-64 lg:max-h-full object-contain"
              />
              {/* overlay */}
              <div className="hidden lg:block absolute bottom-0 left-0 p-6 bg-gradient-to-t from-white/80 to-transparent w-full">
                <h1 className="text-3xl font-bold text-gray-900">
                  {country.name.common}
                </h1>
                <p className="text-gray-700 mt-1">{country.name.official}</p>
              </div>
            </div>

            {/* Details */}
            <div className="w-full lg:w-3/5 p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[80vh]">
              {/* mobile header */}
              <div className="lg:hidden text-center mb-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  {country.name.common}
                </h1>
                <p className="text-gray-700 mt-1">{country.name.official}</p>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <InfoCard
                  icon={<FaMapMarkerAlt />}
                  title="Capital"
                  value={country.capital?.[0] || 'N/A'}
                />
                <InfoCard
                  icon={<FaUsers />}
                  title="Population"
                  value={country.population.toLocaleString()}
                />
                <InfoCard
                  icon={<FaGlobeAmericas />}
                  title="Region"
                  value={`${country.region}${
                    country.subregion ? ` (${country.subregion})` : ''
                  }`}
                />
                <InfoCard
                  icon={<FaMoneyBillWave />}
                  title="Area"
                  value={
                    country.area
                      ? `${country.area.toLocaleString()} km²`
                      : 'N/A'
                  }
                />
                <InfoCard
                  icon={<FaLanguage />}
                  title="Languages"
                  value={
                    country.languages
                      ? Object.values(country.languages).join(', ')
                      : 'N/A'
                  }
                />
                <InfoCard
                  icon={<FaPhone />}
                  title="Calling Code"
                  value={
                    callingCode.startsWith('+')
                      ? callingCode
                      : `+${callingCode}`
                  }
                />
                <InfoCard
                  icon={<FaClock />}
                  title="Timezones"
                  value={country.timezones.join(', ')}
                />
                <InfoCard
                  icon={<FaMoneyBillWave />}
                  title="Currencies"
                  value={formatCurrencies()}
                />
                <InfoCard
                  icon={<FaLanguage />}
                  title="Native Name"
                  value={formatNativeNames()}
                />
                <InfoCard
                  icon={<FaLandmark />}
                  title="Borders"
                  value={formatBorders()}
                />
              </div>

              {/* Quick Facts */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  Quick Facts
                </h3>
                <ul className="space-y-2 text-gray-700">
                  {[
                    ['UN Member', country.unMember ? 'Yes' : 'No'],
                    ['Independent', country.independent ? 'Yes' : 'No'],
                    ['Coordinates', country.latlng.join(', ')],
                    ['Alt Spellings', country.altSpellings.join(', ')],
                  ].map(([label, val]) => (
                    <li key={label} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        <strong>{label}:</strong> {val}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={country.maps.googleMaps}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <FaMapMarkerAlt className="mr-2" />
                View on Google Maps
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CountryModal;
