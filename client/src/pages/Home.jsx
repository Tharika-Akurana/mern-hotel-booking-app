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
          slideItem.style.animation = `slideInFromBottom 0.75s ease forwards ${slideIndex}s`;
        });
      }
    });
  }, [activeIndex]);

  const categories = [
    {
      name: 'Restaurants',
      link: '/restaurants',
      sliderDescription: 'Explore the best dining experiences',
      detailDescription: 'Restaurants offer a variety of food styles to delight your taste buds. They provide delicious meals prepared by top chefs in a cozy and elegant ambiance, making them perfect for family dinners, romantic dates, or business lunches. Restaurants focus exclusively on dining experiences, offering specialized menus and culinary delights. Users visit restaurants for high-quality food, exceptional service, and a memorable dining experience.',
      img: restaurant
    },
    {
      name: 'Resorts',
      link: '/resorts',
      sliderDescription: 'Relax in luxury resorts',
      detailDescription: 'Resorts provide a perfect getaway with luxurious amenities and stunning views. Guests can lounge by the pool, enjoy spa treatments, or engage in outdoor activities, making resorts ideal for a relaxing and rejuvenating vacation. Resorts stand out from other hotel types by offering extensive recreational facilities and a focus on leisure and relaxation. Users choose resorts for their all-inclusive packages, beautiful locations, and the opportunity to unwind and indulge.',
      img: resort
    },
    { 
      name: 'Budget Hotels', 
      link: '/budget-hotels', 
      sliderDescription: 'Affordable stays with essential amenities and comfort', 
      detailDescription: 'Budget Hotels are ideal for travelers looking for affordable accommodations without compromising on comfort. These hotels offer essential amenities, clean rooms, and convenient locations, making them a great choice for budget-conscious travelers. Specially, budget hotels prioritize affordability and practicality. You can budget hotels to save money while still enjoying a comfortable stay, especially when traveling for work or on a tight budget.', 
      img: budget 
    },
    {
      name: 'Boutique Hotels',
      link: '/boutique-hotels',
      sliderDescription: 'Unique accommodations with personalized touches and stylish design',
      detailDescription: 'Boutique Hotels are known for their unique style and personalized service. Each hotel has its own character, offering a cozy and intimate atmosphere. Boutique hotels differ from larger chains by focusing on individuality, design, and guest experience. People prefer boutique hotels for a memorable and distinct stay, with personalized touches and stylish decor that make them feel special and catered to.',
      img: boutique
    },
    {
      name: 'Luxury Hotels',
      link: '/luxury-hotels',
      sliderDescription: 'Experience top-notch amenities and exceptional service in a lavish setting',
      detailDescription: 'Luxury hotels provide the finest in accommodations and service, with spacious rooms, luxurious dining, and premium amenities. These hotels provide an opulent experience, perfect for those looking to indulge and enjoy themselves. Luxury hotels differ from other types by providing top-notch service, exclusive facilities, and a high level of comfort. Users choose luxury hotels for a lavish experience, exceptional service, and to celebrate special occasions in style.',
      img: luxury
    },
    {
      name: 'Guest Houses',
      link: '/guest-houses',
      sliderDescription: 'Enjoy a home-like stay with personalized service and cozy ambiance',
      detailDescription: 'Guest Houses provide a home-like atmosphere with personalized service, ideal for travelers seeking a cozy and welcoming environment. These accommodations offer comfort and convenience with a personal touch, making guests feel at home. Guest houses differ from larger hotels by offering a more intimate and friendly setting. Users book guest houses for their warm hospitality, personalized attention, and the chance to experience local culture in a home-like setting.',
      img: guestHouse
    },
    {
      name: 'Business Hotels',
      link: '/business-hotels',
      sliderDescription: 'Ideal for short stays, offering convenience and comfort for travelers on the go',
      detailDescription: 'Business Hotels cater to the needs of business travelers, offering convenient locations, meeting facilities, and essential amenities for work-related stays. These hotels are designed to provide comfort and efficiency for professionals on the go. Business hotels stand out from other types by focusing on services and facilities that support business activities. Users choose business hotels for their strategic locations, reliable services, and the ability to conduct meetings and work efficiently during their stay.',
      img: business
    },
    {
      name: 'Transient Hotels', 
      link: '/transient-hotels', 
      sliderDescription: 'Ideal for short stays, offering convenience and comfort for travelers on the go', 
      detailDescription: 'Transient Hotels are perfect for short stays, providing convenience and comfort for travelers. Located near airports and transit hubs, these hotels offer easy access and quick accommodations for those on the move. Transient hotels differ from other types by focusing on short-term stays and proximity to transportation hubs. Users book transient hotels for their convenience, quick check-in and check-out processes, and the ability to rest and refresh during travel layovers or short trips.', 
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
                <button className="mt-6 px-4 py-2 bg-darkGold text-white rounded-md hover:bg-goldLeaf">Explore...</button>
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