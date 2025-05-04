import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import CountrySearch from './CountrySearch';
import CountrySelectModal from './CountrySelectModal';
import RotatingGlobe from './RotatingGlobe';
import CountryDetailsPanel from './CountryDetailsPanel';
import { useLazyGetCountriesByNameQuery } from '../../api/restCountriesApi';
import { FaSearch, FaInfoCircle, FaTimes } from 'react-icons/fa';

const Globe = () => {
  const [showMarker, setShowMarker] = useState(false);
  const [countryName, setCountryName] = useState('');
  const [countryCoordinates, setCountryCoordinates] = useState(null);
  const [message, setMessage] = useState('');
  const [matches, setMatches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showSearchPanel, setShowSearchPanel] = useState(true);
  const [showDetailsPanel, setShowDetailsPanel] = useState(true);

  const [fetchByName] = useLazyGetCountriesByNameQuery();

  const handleSearch = async () => {
    setMessage('');
    setShowModal(false);
    setShowMarker(false);
    setSelectedCountry(null);

    try {
      const data = await fetchByName(countryName.trim()).unwrap();
      if (data.length > 1) {
        setMatches(data);
        setShowModal(true);
        setMessage('Multiple countries match. Please select.');
      } else if (data.length === 1) {
        const [lat, lng] = data[0].latlng;
        setCountryCoordinates({ lat, lng });
        setShowMarker(true);
        setMessage('Location found!');
        setSelectedCountry(data[0]);
      } else {
        setMessage('Country not found!');
      }
    } catch {
      setMessage('Error fetching country data.');
    }
  };

  const handleCountrySelect = (country) => {
    const [lat, lng] = country.latlng;
    setCountryCoordinates({ lat, lng });
    setShowMarker(true);
    setShowModal(false);
    setSelectedCountry(country);
    setMessage(`Showing: ${country.name.common}`);
  };

  const isMobile = window.matchMedia('(max-width: 640px)').matches;

  return (
    <div className="relative w-full h-screen bg-[#0a192f] overflow-hidden mt-16">
      {/* Mobile controls */}
      {isMobile && (
        <div className="fixed bottom-4 right-4 z-20 flex gap-2">
          <button
            onClick={() => setShowSearchPanel(!showSearchPanel)}
            className="bg-blue-500 text-white p-3 rounded-full shadow-lg"
            aria-label="Toggle search panel"
          >
            <FaSearch />
          </button>
          <button
            onClick={() => setShowDetailsPanel(!showDetailsPanel)}
            className="bg-green-500 text-white p-3 rounded-full shadow-lg"
            aria-label="Toggle details panel"
          >
            <FaInfoCircle />
          </button>
        </div>
      )}

      {/* Search box */}
      {showSearchPanel && (
        <div
          className={`absolute top-4 left-1/2 transform -translate-x-1/2 w-[90%] sm:left-4 sm:translate-x-0 sm:w-80 md:w-96 z-10 transition-all duration-300 ${
            showSearchPanel
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4'
          }`}
        >
          <CountrySearch
            countryName={countryName}
            setCountryName={setCountryName}
            onSearch={handleSearch}
            message={message}
            onClose={() => setShowSearchPanel(false)}
            isMobile={isMobile}
          />
        </div>
      )}

      {/* Details panel */}
      {showDetailsPanel && (
        <div
          className={`absolute bottom-0 left-0 w-full sm:absolute sm:top-4 sm:left-auto sm:right-4 sm:w-80 md:w-96 z-10 transition-all duration-300 ${
            showDetailsPanel
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <CountryDetailsPanel
            country={selectedCountry}
            onClose={() => setShowDetailsPanel(false)}
            isMobile={isMobile}
          />
        </div>
      )}

      {/* Country-select modal */}
      {showModal && matches.length > 1 && (
        <CountrySelectModal
          matches={matches}
          onSelect={handleCountrySelect}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* canvas */}
      <Canvas
        className="absolute inset-0"
        camera={{ position: [0, 0, 12], fov: 45 }}
      >
        <Stars radius={50} depth={50} count={5000} factor={4} fade />
        <RotatingGlobe
          showMarker={showMarker}
          countryCoordinates={countryCoordinates}
          countryName={selectedCountry?.name?.common}
        />
      </Canvas>
    </div>
  );
};

export default Globe;
