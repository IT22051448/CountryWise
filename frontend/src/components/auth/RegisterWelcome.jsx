import React from 'react';

const RegisterWelcome = () => {
  return (
    <div
      className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-400 p-8 items-center justify-center"
      data-testid="welcome-container"
    >
      <div className="text-center">
        <svg
          className="w-16 h-16 mx-auto text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          data-testid="welcome-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2a10 10 0 00-3.516 19.363c.555.102.758-.241.758-.535 0-.265-.01-1.137-.016-2.062-3.09.672-3.744-1.49-3.744-1.49-.505-1.285-1.233-1.63-1.233-1.63-.998-.682.076-.668.076-.668 1.104.078 1.684 1.137 1.684 1.137.983 1.684 2.576 1.19 3.208.91.098-.708.384-1.19.698-1.463-2.468-.28-5.064-1.234-5.064-5.495 0-1.213.433-2.204 1.144-2.983-.115-.28-.496-1.408.11-2.937 0 0 .93-.298 3.045 1.137.883-.245 1.83-.367 2.775-.37.944.003 1.893.125 2.775.37 2.115-1.435 3.044-1.137 3.044-1.137.607 1.53.226 2.657.11 2.937.712.78 1.143 1.77 1.143 2.983 0 4.272-2.599 5.21-5.076 5.483.394.34.74 1.012.74 2.038 0 1.47-.014 2.655-.014 3.02 0 .297.2.642.764.533A10.001 10.001 0 0012 2z"
          />
        </svg>
        <h3 className="text-white text-2xl font-bold mt-4">
          Discover Your World
        </h3>
        <p className="text-white mt-2">
          Join CountryWise to explore countries, cultures, and travel insights.
        </p>
      </div>
    </div>
  );
};

export default RegisterWelcome;
