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

  const handleSlideChange = (swiper) => {
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
    { name: 'Restaurants', link: '/restaurant', description: 'Explore the best dining experiences', img: restaurant },
    { name: 'Resorts', link: '/resorts', description: 'Relax in luxury resorts', img: resort },
    { name: 'Budget Hotels', link: '/budget-hotels', description: 'Affordable stays with essential amenities and comfort', img: budget },
    { name: 'Boutique Hotels', link: '/boutique-hotels', description: 'Unique accommodations with personalized touches and stylish design', img: boutique },
    { name: 'Luxury Hotels', link: '/luxury-hotels', description: 'Experience top-notch amenities and exceptional service in a lavish setting', img: luxury },
    { name: 'Guest Houses', link: '/guest-houses', description: 'Enjoy a home-like stay with personalized service and cozy ambiance', img: guestHouse },
    { name: 'Business Hotels', link: '/business-hotels', description: 'Convenient and well-equipped for business travelers, with meeting rooms and workspaces', img: business },
    { name: 'Transient Hotels', link: '/transient-hotels', description: 'Ideal for short stays, offering convenience and comfort for travelers on the go', img: transient },
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
    <div className="container mx-auto p-6">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        modules={[Navigation, Pagination]}
        onSlideChange={handleSlideChange}
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                ...containerStyle,
                backgroundImage: `url(${category.img})`,
              }}
            >
              <div  style={overlayStyle}></div>
              <div style={textCenterStyle} className="slide-content text-white">
                <h2 className="slide-item text-4xl font-bold font-serif">{category.name}</h2>
                <p className="slide-item text-xl mt-2 ">{category.description}</p>
                <a href={category.link}>
                  <button className="slide-item mt-4 px-6 py-2 bg-goldLeaf text-white rounded-md hover:bg-darkGold">More</button>
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

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
