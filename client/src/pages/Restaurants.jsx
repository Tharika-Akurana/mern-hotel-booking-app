import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Restaurants = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch('/api/listing/all');
        const data = await res.json();
        const restaurantListings = data.filter(listing => listing.hotelType === 'restaurant');
        restaurantListings.forEach(listing => {
          listing.samllDescription = summarizeDescription(listing.description);
        });
        setListings(restaurantListings);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const summarizeDescription = (description) => {
    if (!description) return '';
    const firstSentence = description.split('. ')[0];
    return firstSentence.length > 50 ? description.slice(0, 100) + '...' : firstSentence + '.';
  };

  const getGoogleMapsLink = (address) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  const handleViewMore = (id) => {
    navigate(`/hotel-details/${id}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-thin underline text-black font-serif text-center mb-10">Restaurants</h1>
      {loading && <p className="text-red-700">{error}</p>}
      <div className="grid gap-4">
        {listings.map((listing, index) => (
          <div key={listing._id} className="flex flex-row p-4 border rounded-lg items-center">
            <div className="w-48 h-48 mr-4">
              <img src={listing.imageUrls[0]} alt='Hotel' className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="flex-1 text-left">
              <h2 className="text-xl font-sans font-semibold mb-2">{listing.name}</h2>
              <a href={getGoogleMapsLink(listing.address)} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-900 underline mb-1 hover:opacity-75 block">
                {listing.address}
              </a>
              <p className="mb-1">{listing.samllDescription}</p>
              <p className="text-yellow-500 mb-2">{'★'.repeat(listing.starRating)}</p>
              <button onClick={() => handleViewMore(listing._id)} className="px-4 py-2 bg-darkGold text-white rounded-lg">View More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
