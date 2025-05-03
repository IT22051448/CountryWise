import React from 'react';

export default function ErrorView({ message }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full text-center">
        <h2 className="text-xl font-bold text-red-800 mb-2">
          Error Loading Collections
        </h2>
        <p className="text-red-600 mb-4">{message}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
