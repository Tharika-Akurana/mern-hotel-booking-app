import React, { useEffect, useState } from 'react';

const LuxuryHotels = ( ) => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    const fetchListings = async () => {
      try {
        const res = await fetch ('/api/listing/all');
        const data = await res.json();
        const luxuryHotelListings = data.filter(listing => listing.hotelType === 'luxury');
        setListings(luxuryHotelListings);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchListings();

  }, []);

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-thin underline text-black font-serif text-center mb-10'>Luxury Hotels</h1>
      {loading && <p className='text-red-700'>{error}</p>}
      <div className='grid gap-4'>
        {listings.map(listing => (
          <div key={listing._id} className='flex justify-between p-4 border rounded-lg items-center'>
            <img src={listing.imageUrls[0]} alt='Hotel' className='w-36 h-36 object-cover rounded-lg mr-4' />
            <div className='text-lg font-semibold flex-1 hover:underline truncate'>
              <h2>{listing.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

};

export default LuxuryHotels;