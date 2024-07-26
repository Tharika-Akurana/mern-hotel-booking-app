import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';
import restaurant from '../assets/Images/Restaurant.jpg';
import resort from '../assets/Images/Resort.jpg';
import guestHouse from '../assets/Images/Guest_House.jpg';
import budget from '../assets/Images/Budget.jpg';
import boutique from '../assets/Images/Boutique.jpg';
import luxury from '../assets/Images/Luxury.jpg';
import business from '../assets/Images/Business.jpg';
import transient from '../assets/Images/Transient.jpg';

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSliderChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  useEffect(() => {
    const items = document.querySelectorAll('.slide-content');
    items.forEach((item, index) => {
      if (index === activeIndex) {
        const slideItems = item.querySelectorAll('.slide-item');
        slideItems.forEach((slideItem, slideIndex) => {
          slideItem.style.animation = `slideInFromBottom 1s ease forwards ${slideIndex}s`;
        });
      }
    });
  }, [activeIndex]);

  const categories = [
    {
      name: 'Restaurants',
      link: '/restaurants',
      sliderDescription: 'Explore the best dining experiences',
      detailDescription: 'Restaurants offer a variety of cuisines to delight your taste buds. Enjoy gourmet meals prepared by top chefs in a cozy and elegant ambiance. Perfect for a family dinner, romantic date, or business lunch.',
      img: restaurant
    },
    {
      name: 'Resorts',
      link: '/resorts',
      sliderDescription: 'Relax in luxury resorts',
      detailDescription: 'Resorts provide a perfect getaway with luxurious amenities and stunning views. Whether you want to lounge by the pool, enjoy spa treatments, or engage in outdoor activities, resorts offer everything you need for a relaxing and rejuvenating vacation.',
      img: resort
    },
    { 
      name: 'Budget Hotels', 
      link: '/budget-hotels', 
      sliderDescription: 'Affordable stays with essential amenities and comfort', 
      detailDescription: 'Budget Hotels are ideal for travelers looking for affordable accommodations without compromising on comfort. These hotels offer essential amenities, clean rooms, and convenient locations, making them a great choice for budget-conscious travelers.', 
      img: budget 
    },
    {
      name: 'Boutique Hotels',
      link: '/boutique-hotels',
      sliderDescription: 'Unique accommodations with personalized touches and stylish design',
      detailDescription: 'Boutique Hotels are known for their unique style and personalized service. Each hotel has its own character, offering a cozy and intimate atmosphere. Perfect for those seeking a memorable and distinct stay.',
      img: boutique
    },
    {
      name: 'Luxury Hotels',
      link: '/luxury-hotels',
      sliderDescription: 'Experience top-notch amenities and exceptional service in a lavish setting',
      detailDescription: 'Luxury Hotels offer the finest in accommodations and service. Enjoy spacious rooms, gourmet dining, and premium amenities. These hotels provide an opulent experience, perfect for those looking to indulge and pamper themselves.',
      img: luxury
    },
    {
      name: 'Guest Houses',
      link: '/guest-houses',
      sliderDescription: 'Enjoy a home-like stay with personalized service and cozy ambiance',
      detailDescription: 'Guest Houses provide a home-like atmosphere with personalized service. Ideal for travelers seeking a cozy and welcoming environment, these accommodations offer comfort and convenience with a personal touch.',
      img: guestHouse
    },
    {
      name: 'Business Hotels',
      link: '/business-hotels',
      sliderDescription: 'Ideal for short stays, offering convenience and comfort for travelers on the go',
      detailDescription: 'Transient Hotels are perfect for short stays, providing convenience and comfort for travelers. Located near airports and transit hubs, these hotels offer easy access and quick accommodations for those on the move.',
      img: business
    },
    {
      name: 'Transient Hotels', 
      link: '/transient-hotels', 
      sliderDescription: 'Ideal for short stays, offering convenience and comfort for travelers on the go', 
      detailDescription: 'Transient Hotels are perfect for short stays, providing convenience and comfort for travelers. Located near airports and transit hubs, these hotels offer easy access and quick accommodations for those on the move.', 
      img: transient 
    },
  ];

  const containerStyle = {
    position: 'relative',
    width: '100vw',
    height: '75vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const overlayStyle = {
    position: 'absolute',
    inset: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  };

  const textCenterStyle = {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  };

  return (
    <div className="container mx-auto p-10">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable:true }}
        navigation
        modules={[Navigation, Pagination]}
        onSlideChange={handleSliderChange}
      >
        {categories.map((category, index) => (
          <SwiperSlide key = {index}>
            <div
              style={{
                ...containerStyle,
                backgroundImage: `url(${category.img})`,
              }}
            >
              <div style={overlayStyle}></div>
              <div style={textCenterStyle} className="slide-content text-white">
                <h2 className="slide-item text-4xl font-bold font-serif">{category.name}</h2>
                <p className="slide-item text-xl mt-2">{category.sliderDescription}</p>
                <a href={category.link}>
                  <button className="slide-item mt-4 px-6 py-2 bg-goldLeaf text-white rounded-md hover:bg-darkGold">More</button>
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((category, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-sans font-bold text-DeepNavyBlue">{category.name}</h3>
              <p className="text-lg text-gray-700 mt-4">{category.detailDescription}</p>
            </div>
            <div className="flex justify-end mt-6">
              <a href={category.link}>
                <button className="mt-6 px-4 py-2 bg-darkGold text-white rounded-md hover:bg-goldLeaf">Show Items</button>
              </a>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes slideInFromBottom {
            0% {
              transform: translateY(100%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }

          .slide-content {
            position: relative;
            height: 100%;
          }

          .slide-item {
            opacity: 0;
          }
        `}
      </style>
    </div>
  );
};

export default Home;