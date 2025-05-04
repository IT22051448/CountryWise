import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AuthRequired from '@/components/collection/AuthRequired';
import LoadingSpinner from '@/components/collection/LoadingSpinner';
import ErrorView from '@/components/collection/ErrorView';
import Tabs from '@/components/collection/Tabs';
import VisitedSection from '@/components/collection/VisitedSection';
import WishlistSection from '@/components/collection/WishlistSection';
import { useToast } from '@/hooks/ToastContext';

export default function Collection() {
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = Boolean(token);
  const API = import.meta.env.VITE_API_URL;
  const { addToast } = useToast();
  const [visitedCountryNames, setVisitedCountryNames] = useState([]);
  const [wishlistCountryNames, setWishlistCountryNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('visited');

  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(false);
      addToast({
        type: 'error',
        message: 'Your will need to be logged in to access this feature!',
      });
      return;
    }

    const fetchCollections = async () => {
      try {
        setLoading(true);

        const [vRes, wRes] = await Promise.all([
          fetch(`${API}/auth/visited`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API}/auth/wishlist`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const [vData, wData] = await Promise.all([vRes.json(), wRes.json()]);

        if (!vRes.ok) throw new Error(vData.message);
        if (!wRes.ok) throw new Error(wData.message);

        setVisitedCountryNames(vData.visited || []);
        setWishlistCountryNames(wData.wishlist || []);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, [isLoggedIn, API, token]);

  const toggleVisited = async (e, countryName) => {
    e.stopPropagation();
    if (!isLoggedIn) return;
    const inList = visitedCountryNames.includes(countryName);
    try {
      const res = await fetch(`${API}/auth/visited`, {
        method: inList ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: countryName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      addToast({
        type: 'success',
        message: 'Visited countries updated successfully!',
      });
      setVisitedCountryNames(data.visited || []);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleWishlist = async (e, countryName) => {
    e.stopPropagation();
    if (!isLoggedIn) return;
    const inList = wishlistCountryNames.includes(countryName);
    try {
      const res = await fetch(`${API}/auth/wishlist`, {
        method: inList ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: countryName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      addToast({
        type: 'success',
        message: 'Wishlist countries updated successfully!',
      });
      setWishlistCountryNames(data.wishlist || []);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isLoggedIn) return <AuthRequired />;
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorView message={error} />;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          My Country Collections
        </h1>

        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          visitedCount={visitedCountryNames.length}
          wishlistCount={wishlistCountryNames.length}
        />

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {activeTab === 'visited' ? (
            <VisitedSection
              countryNames={visitedCountryNames}
              otherList={wishlistCountryNames}
              onToggleVisited={toggleVisited}
              onToggleWishlist={toggleWishlist}
            />
          ) : (
            <WishlistSection
              countryNames={wishlistCountryNames}
              otherList={visitedCountryNames}
              onToggleVisited={toggleVisited}
              onToggleWishlist={toggleWishlist}
            />
          )}
        </div>
      </div>
    </div>
  );
}
