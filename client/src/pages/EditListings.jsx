import react, { useEffect, useState } from 'react';
import {Link } from 'react-router-dom';

const EditListings = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res= await fetch('/api/listing/all');
        const data = await res.json();
        setListings(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchListings();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure want to delete this listing?")) {
      try {
        const res = await fetch(`/api/listing/delete/${id}`,{
          method: 'DELETE',
        });
        const data = await res.json();
        if (res.ok) {
          window.location.reload();
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };


  return (
    <div className='container mx-auto p-6'>
        <h1 className='text-3xl font-semibold text-black text-center mb-6'>Edit Hotels</h1>
        {loading && <p>Loading...</p>}
        {error && <p className='text-red-700'>{error}</p>}
        <div className='grid gap-4'>
          {listings.map(listing => (
            <div key={listing._id} className='flex justify-between p-4 border rounded-lg items-center'>
              <img src={listing.imageUrls[0]} alt='Hotel' className='w-36 h-36 object-cover rounded-lg mr-4' />
              <div className='text-lg font-semibold flex-1 hover:underline truncate'>
                <h2 >{listing.name}</h2>
              </div>
                <Link to={`/edit-listing/${listing._id}`} className='px-4 py-2 bg-darkGold text-white rounded-lg uppercase hover:opacity-95'>
                    Edit
                </Link>
                <button onClick={() => handleDelete(listing._id)} className='px-4 py-2 bg-red-700 text-white rounded-lg uppercase hover:opacity-95 ml-2'>
                  Delete
                </button>
            </div>
                ))}
        </div>
    </div>
  );
  
};

export default EditListings;