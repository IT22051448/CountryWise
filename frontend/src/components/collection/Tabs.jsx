import React from 'react';
import { FaHeart, FaBookmark } from 'react-icons/fa';

export default function Tabs({
  activeTab,
  setActiveTab,
  visitedCount,
  wishlistCount,
}) {
  return (
    <div className="flex border-b border-gray-200 mb-8">
      <button
        onClick={() => setActiveTab('visited')}
        className={`px-4 py-2 font-medium text-sm flex items-center ${
          activeTab === 'visited'
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <FaHeart className="mr-2" />
        Visited ({visitedCount})
      </button>
      <button
        onClick={() => setActiveTab('wishlist')}
        className={`px-4 py-2 font-medium text-sm flex items-center ${
          activeTab === 'wishlist'
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <FaBookmark className="mr-2" />
        Wishlist ({wishlistCount})
      </button>
    </div>
  );
}
