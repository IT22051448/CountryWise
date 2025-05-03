import React from 'react';

export default function EmptyState({ icon, title, message }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-md">{message}</p>
    </div>
  );
}
