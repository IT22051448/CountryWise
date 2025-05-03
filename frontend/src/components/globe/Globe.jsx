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
        setMessage('Multiple matches—please select.');
      } else if (data.length === 1) {
        const [lat, lng] = data[0].latlng;
        setCountryCoordinates({ lat, lng });
        setShowMarker(true);
        setSelectedCountry(data[0]);
        setMessage(`Showing: ${data[0].name.common}`);
      } else {
        setMessage('Country not found!');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error fetching data.');
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
      {/* Search bar */}
      <CountrySearch
        countryName={countryName}
        setCountryName={setCountryName}
        onSearch={handleSearch}
        message={message}
      />

      {/* Details sidebar / bottom panel */}
      <CountryDetailsPanel country={selectedCountry} />

      {/* Disambiguation modal */}
      {showModal && (
        <CountrySelectModal matches={matches} onSelect={handleCountrySelect} />
      )}

      {/* 3D Globe */}
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
