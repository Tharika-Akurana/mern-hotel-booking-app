import React from 'react';
import { Link } from 'react-router-dom';
import restaurant from '../assets/Images/Restaurant.jpg';
import resort from '../assets/Images/Resort.jpg';
import guestHouse from '../assets/Images/Guest_House.jpg';
import budget from '../assets/Images/Budget.jpg';
import boutique from '../assets/Images/Boutique.jpg';
import luxury from '../assets/Images/Luxury.jpg';
import business from '../assets/Images/Business.jpg';
import transient from '../assets/Images/Transient.jpg';

const Listings = () => {

  const categories = [
    {name: 'Restaurants', link: '/restaurants', description: 'Explore the best dining experiences', img: restaurant},
    {name: 'Resorts', link: '/resorts', description: 'Relax in luxury resorts', img: resort},
    {name: 'Guest Houses', link: '/guest-houses', description: 'Enjoy a home-like stay with personalized service and cozy ambiance', img: guestHouse},
    {name: 'Budget Hotels', link: '/budget-hotels', description: 'Affordable stays with essential amenities and comfort', img: budget},
    {name: 'Boutique Hotels', link: '/boutique-hotels', description: 'Unique accommodations with personalized touches and stylish design', img: boutique},
    {name: 'Luxury Hotels', link: '/luxury-hotels', description: 'Experience top-notch amenities and exceptional service in a lavish setting', img: luxury},
    {name: 'Business Hotels', link: '/business-hotels', description: 'Convenient and well-equipped for business travelers, with meeting rooms and workspaces', img: business},
    {name: 'Transient Hotels', link: '/transient-hotels', description: 'Ideal for short stays, offering convenience and comfort for travelers on the go', img: transient},
  ];

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-thin underline text-black font-serif text-center mb-10'>
        Hotels & Restaurants
      </h1>
      <div className='text-center grid grid-cols-1 md:grid-cols-2 gap-6'>
        {categories.map((category) => (
          <div key = {category.name} className='p-3 text-lg font-semibold uppercase flex flex-col items-center'>
            <img src={category.img} alt={category.name} className='w-80 h-80 items-center object-cover rounded-3xl mb-2 shadow-2xl'/>
              <div className='w-full text-center'>
                {category.name}
                <p className='text-sm font-normal normal-case'>{category.description}</p>
              </div>
            <Link to={category.link}>
              <button className='mt-2 p-2 bg-goldLeaf text-white rounded-md hover:bg-darkGold'>
                View {category.name}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;
