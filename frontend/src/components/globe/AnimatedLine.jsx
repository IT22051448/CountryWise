import React, { useEffect, useState } from 'react';

export default function AnimatedLine({ text, start, onComplete, icon }) {
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
  }, [text, start, onComplete]);

  const colonIndex = displayed.indexOf(':');
  const label = colonIndex !== -1 ? displayed.slice(0, colonIndex + 1) : '';
  const value = colonIndex !== -1 ? displayed.slice(colonIndex + 1) : displayed;

  return (
    <div className="flex items-start mb-2">
      <div className="text-blue-600 mr-2 mt-0.5">{icon}</div>
      <p className="text-sm flex-1">
        <span className="text-gray-700 font-semibold">{label}</span>
        <span className="text-gray-900 font-medium">{value}</span>
      </p>
    </div>
  );
}
