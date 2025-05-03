import React, { useState, useEffect } from 'react';
import {
  FaGlobe,
  FaCity,
  FaUsers,
  FaMapMarkerAlt,
  FaClock,
  FaLanguage,
  FaMoneyBillWave,
  FaFlag,
} from 'react-icons/fa';
import AnimatedLine from './AnimatedLine';

const CountryDetailsPanel = ({ country }) => {
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
    { text: `Name: ${name.common || 'N/A'}`, icon: <FaGlobe size={14} /> },
    { text: `Capital: ${capital?.[0] || 'N/A'}`, icon: <FaCity size={14} /> },
    {
      text: `Population: ${population.toLocaleString() || 'N/A'}`,
      icon: <FaUsers size={14} />,
    },
    { text: `Region: ${region || 'N/A'}`, icon: <FaMapMarkerAlt size={14} /> },
    {
      text: `Timezone: ${timezones?.[0] || 'N/A'}`,
      icon: <FaClock size={14} />,
    },
    { text: `Languages: ${languageList}`, icon: <FaLanguage size={14} /> },
    {
      text: `Currencies: ${currencyList}`,
      icon: <FaMoneyBillWave size={14} />,
    },
  ];

  return (
    <div
      className="
        fixed inset-x-0 bottom-0 sm:top-0 sm:bottom-auto sm:right-0
        w-full sm:w-80 bg-white p-4 overflow-y-auto shadow-lg z-10
        rounded-t-lg sm:rounded-lg sm:mt-12 sm:mr-3 border border-gray-100
        max-h-1/2 sm:max-h-[80vh]
      "
    >
      <div className="flex items-center mb-4">
        <FaFlag className="text-red-500 mr-2" size={18} />
        <h2 className="text-xl font-bold text-gray-800">Country Details</h2>
      </div>

      {flags?.png && (
        <div className="mb-4 flex justify-center">
          <img
            src={flags.png}
            alt={name.common}
            className="w-32 h-auto rounded-md shadow-sm border border-gray-200"
          />
        </div>
      )}

      <div className="bg-blue-50 p-3 rounded-md mb-4">
        <h3 className="text-base font-semibold text-blue-800 mb-2 flex items-center">
          <FaGlobe className="mr-1.5" size={14} /> Basic Info
        </h3>
        <div className="space-y-1.5">
          {lines.slice(0, 4).map((line, idx) => (
            <AnimatedLine
              key={`${panelId}-${idx}`}
              text={line.text}
              start={currentLine === idx}
              onComplete={() => setCurrentLine((prev) => prev + 1)}
              icon={line.icon}
            />
          ))}
        </div>
      </div>

      <div className="bg-green-50 p-3 rounded-md">
        <h3 className="text-base font-semibold text-green-800 mb-2 flex items-center">
          <FaLanguage className="mr-1.5" size={14} /> Cultural Info
        </h3>
        <div className="space-y-1.5">
          {lines.slice(4).map((line, idx) => (
            <AnimatedLine
              key={`${panelId}-${idx + 4}`}
              text={line.text}
              start={currentLine === idx + 4}
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
