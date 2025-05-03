import React from 'react';
import { facts } from '@/data/homeContent';
import { FaGlobeAmericas } from 'react-icons/fa';

const WorldFacts = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-200 to-blue-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full p-3 mb-4">
            <FaGlobeAmericas size={28} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Amazing World Facts
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover fascinating information from around the globe
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facts.map(({ id, fact, image, source }) => (
            <div
              key={id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={image}
                  alt={`Fact ${id}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              </div>

              <div className="p-5">
                <p className="text-gray-700 text-base md:text-lg mb-4">
                  {fact}
                </p>
                {source && (
                  <div className="text-xs text-gray-500 mt-3 border-t border-gray-100 pt-3">
                    Source: <span className="text-blue-500">{source}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 inline-flex items-center">
            <FaGlobeAmericas className="mr-2" />
            Explore More Facts
          </button>
        </div>
      </div>
    </section>
  );
};

export default WorldFacts;
