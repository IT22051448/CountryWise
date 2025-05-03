import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import CountrySearch from './CountrySearch';
import CountrySelectModal from './CountrySelectModal';
import RotatingGlobe from './RotatingGlobe';
import CountryDetailsPanel from './CountryDetailsPanel';
import { useLazyGetCountriesByNameQuery } from '../../api/restCountriesApi';

const Globe = () => {
  const [showMarker, setShowMarker] = useState(false);
  const [countryName, setCountryName] = useState('');
  const [countryCoordinates, setCountryCoordinates] = useState(null);
  const [message, setMessage] = useState('');
  const [matches, setMatches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [fetchByName, { isLoading }] = useLazyGetCountriesByNameQuery();

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
        setSelectedCountry(null);
      } else if (data.length === 1) {
        const [lat, lng] = data[0].latlng;
        setCountryCoordinates({ lat, lng });
        setShowMarker(true);
        setMessage('Location found!');
        setShowModal(false);
        setSelectedCountry(data[0]);
      } else {
        setMessage('Country not found!');
        setSelectedCountry(null);
        setShowMarker(false);
      }
    } catch (error) {
      console.error('Error:', error);
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

  return (
    <div className="relative h-full w-full bg-[#0a192f]">
      <div className="absolute top-4 left-4 z-10">
        <CountrySearch
          countryName={countryName}
          setCountryName={setCountryName}
          onSearch={handleSearch}
          message={message}
        />
      </div>

      <CountryDetailsPanel country={selectedCountry} />

      {showModal && matches.length > 1 && (
        <CountrySelectModal matches={matches} onSelect={handleCountrySelect} />
      )}

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
