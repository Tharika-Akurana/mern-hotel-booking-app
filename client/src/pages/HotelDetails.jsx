import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const res = await fetch(`/api/listing/${id}`);
        const data = await res.json();
        setHotel(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-thin underline text-black font-serif text-center mb-10'>{hotel.name}</h1>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop = {true}
        speed = {1000}
        className='mb-6'
        style = {{ width: '100%', height: '550px' }}
      >
        {hotel.imageUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <img src={url} alt={`Hotel ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </SwiperSlide>
        ))}
      </Swiper>
      <p>{hotel.description}</p>
      <p>{'★'.repeat(hotel.starRating)}</p>
      <p>{hotel.address}</p>
    </div>
  );
};

export default HotelDetails;
