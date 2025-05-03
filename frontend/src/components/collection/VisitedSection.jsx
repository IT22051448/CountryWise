import React from 'react';
import { FaHeart, FaRegSadTear } from 'react-icons/fa';
import CountryCard from './CountryCard';
import EmptyState from './EmptyState';

export default function VisitedSection({
  countryNames,
  otherList,
  onToggleVisited,
  onToggleWishlist,
}) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <FaHeart className="text-red-500 mr-2" />
        Countries I&apos;ve Visited
      </h2>
      {countryNames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {countryNames.map((cn) => (
            <CountryCard
              key={cn}
              countryName={cn}
              isVisited={true}
              isWishlisted={otherList.includes(cn)}
              onToggleVisited={onToggleVisited}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<FaRegSadTear className="text-4xl text-gray-400" />}
          title="No Visited Countries Yet"
          message="You have not added any country to your Visited Country List."
        />
      )}
    </div>
  );
}
