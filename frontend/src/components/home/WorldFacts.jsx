import React from 'react';
import { facts } from '@/data/homeContent';
import { FaGlobeAmericas } from 'react-icons/fa';
import { useToast } from '@/hooks/ToastContext';

const WorldFacts = () => {
  const { addToast } = useToast();
  const handleExploreClick = () =>
    addToast({
      type: 'info',
      message: 'Apologies, this feature is not available yet!',
    });

  return (
    <section className="py-16 bg-gradient-to-b from-blue-200 to-blue-100 overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full p-3 mb-4">
            <FaGlobeAmericas size={28} />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Amazing World Facts
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg mx-auto max-w-2xl">
            Discover fascinating information from around the globe
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facts.map(({ id, fact, image, source }) => (
            <div
              key={id}
              className="group relative bg-white rounded-xl overflow-hidden shadow transition-shadow hover:shadow-xl border border-gray-100"
            >
              <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden">
                <img
                  src={image}
                  alt={`Fact ${id}`}
                  className="w-full h-full object-cover max-w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-3">
                  {fact}
                </p>
                {source && (
                  <div className="text-xs text-gray-500 border-t pt-2">
                    Source: <span className="text-blue-500">{source}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={handleExploreClick}
            className="inline-flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 sm:py-3 px-5 sm:px-8 rounded-full shadow transition-shadow hover:shadow-lg text-sm sm:text-base"
          >
            <FaGlobeAmericas className="mr-2" />
            Explore More Facts
          </button>
        </div>
      </div>
    </section>
  );
};

export default WorldFacts;
