import React, { useEffect, useState } from 'react';
import {
  FaGlobe,
  FaCity,
  FaUsers,
  FaMapMarkerAlt,
  FaClock,
  FaLanguage,
  FaMoneyBillWave,
  FaFlag,
  FaTimes,
} from 'react-icons/fa';

const AnimatedLine = ({ text, start, onComplete, icon }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    let interval;

    if (start) {
      setDisplayed('');
      interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          onComplete();
        }
      }, 20);
    }

    return () => clearInterval(interval);
  }, [text, start]);

  const colonIndex = displayed.indexOf(':');
  const label = colonIndex !== -1 ? displayed.slice(0, colonIndex + 1) : '';
  const value = colonIndex !== -1 ? displayed.slice(colonIndex + 1) : displayed;

  return (
    <div className="flex items-start mb-1 sm:mb-2">
      <div className="text-blue-600 mr-2 mt-0.5">{icon}</div>
      <p className="text-xs sm:text-sm flex-1">
        <span className="text-gray-700 font-semibold">{label}</span>
        <span className="text-gray-900 font-medium">{value}</span>
      </p>
    </div>
  );
};

const CountryDetailsPanel = ({ country, onClose, isMobile }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [panelId, setPanelId] = useState(0);

  useEffect(() => {
    if (country) {
      setCurrentLine(0);
      setPanelId((id) => id + 1);
    }
  }, [country]);

  if (!country) return null;

  const {
    name,
    capital,
    population,
    region,
    timezones,
    languages,
    currencies,
    flags,
  } = country;

  const languageList = languages ? Object.values(languages).join(', ') : 'N/A';
  const currencyList = currencies
    ? Object.values(currencies)
        .map((c) => `${c.name}${c.symbol ? ` (${c.symbol})` : ''}`)
        .join(', ')
    : 'N/A';

  const lines = [
    { text: `Name: ${name?.common || 'N/A'}`, icon: <FaGlobe size={12} /> },
    { text: `Capital: ${capital?.[0] || 'N/A'}`, icon: <FaCity size={12} /> },
    {
      text: `Population: ${population?.toLocaleString() || 'N/A'}`,
      icon: <FaUsers size={12} />,
    },
    { text: `Region: ${region || 'N/A'}`, icon: <FaMapMarkerAlt size={12} /> },
    {
      text: `Timezone: ${timezones?.[0] || 'N/A'}`,
      icon: <FaClock size={12} />,
    },
    { text: `Languages: ${languageList}`, icon: <FaLanguage size={12} /> },
    {
      text: `Currencies: ${currencyList}`,
      icon: <FaMoneyBillWave size={12} />,
    },
  ];

  return (
    <div className="bg-white p-3 sm:p-4 w-full sm:w-80 md:w-96 shadow-lg rounded-lg border border-gray-100 relative">
      {isMobile && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          aria-label="Close details panel"
        >
          <FaTimes size={16} />
        </button>
      )}

      <div className="flex items-center mb-3 sm:mb-4">
        <FaFlag className="text-red-500 mr-2" size={16} />
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">
          Country Details
        </h2>
      </div>

      {flags?.png && (
        <div className="mb-3 sm:mb-4 flex justify-center">
          <img
            src={flags.png}
            alt={name?.common}
            className="w-24 sm:w-32 h-auto rounded-md shadow-sm border border-gray-200"
          />
        </div>
      )}

      <div className="bg-blue-50 p-2 sm:p-3 rounded-md mb-3 sm:mb-4">
        <h3 className="text-sm sm:text-base font-semibold text-blue-800 mb-1 sm:mb-2 flex items-center">
          <FaGlobe className="mr-1.5" size={12} /> Basic Info
        </h3>
        <div className="space-y-1 sm:space-y-1.5">
          {lines.slice(0, 4).map((line, index) => (
            <AnimatedLine
              key={`${panelId}-${index}`}
              text={line.text}
              start={currentLine === index}
              onComplete={() => setCurrentLine((prev) => prev + 1)}
              icon={line.icon}
            />
          ))}
        </div>
      </div>

      <div className="bg-green-50 p-2 sm:p-3 rounded-md">
        <h3 className="text-sm sm:text-base font-semibold text-green-800 mb-1 sm:mb-2 flex items-center">
          <FaLanguage className="mr-1.5" size={12} /> Cultural Info
        </h3>
        <div className="space-y-1 sm:space-y-1.5">
          {lines.slice(4).map((line, index) => (
            <AnimatedLine
              key={`${panelId}-${index + 4}`}
              text={line.text}
              start={currentLine === index + 4}
              onComplete={() => setCurrentLine((prev) => prev + 1)}
              icon={line.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountryDetailsPanel;
