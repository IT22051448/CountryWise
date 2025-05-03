import React from 'react';
import { FaBookmark } from 'react-icons/fa';
import { TbListSearch } from 'react-icons/tb';
import CountryCard from './CountryCard';
import EmptyState from './EmptyState';

export default function WishlistSection({
  countryNames,
  otherList,
  onToggleVisited,
  onToggleWishlist,
}) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <FaBookmark className="text-blue-500 mr-2" />
        My Travel Wishlist
      </h2>
      {countryNames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {countryNames.map((cn) => (
            <CountryCard
              key={cn}
              countryName={cn}
              isVisited={otherList.includes(cn)}
              isWishlisted={true}
              onToggleVisited={onToggleVisited}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<TbListSearch className="text-4xl text-gray-400" />}
          title="Empty Wishlist"
          message="You have not added any country to your Wishlist Country List."
        />
      )}
    </div>
  );
}
