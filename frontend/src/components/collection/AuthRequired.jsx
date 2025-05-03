import React from 'react';
import { FaGlobeAmericas } from 'react-icons/fa';

export default function AuthRequired() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <FaGlobeAmericas className="text-5xl text-blue-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Sign In Required
        </h2>
        <p className="text-gray-600 mb-6">
          Please sign in to view and manage your country collections.
        </p>
        <button
          onClick={() => {}}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
