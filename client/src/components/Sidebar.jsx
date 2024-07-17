import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Images/Logo.png';

const Sidebar = () => {
  return (
    <div className='w-64 h-auto bg-DeepNavyBlue text-white flex flex-col justify-between'>
      <div className='mb-8'></div>
      <div className='p-4 text-center mb-4'>
        <Link to="/">
          <img src={logo} alt="Logo" className='mx-auto mb-4 w-16 h-16 rounded-full' /> 
          <h1 className='font-bold text-sm sm:text-xl flex flex-col items-center mb-4'>
            <span className='text-slate-300'>
                Stay&Dine
            </span>
            <span className='text-slate-100'>
               Hub
            </span>
          </h1>
        </Link>
      </div>
      <nav className='flex-grow items-center justify-center'>
        <Link to="/create-listings" className='block py-3 px-4 hover:bg-gray-500'>
          New Hotel Listing
        </Link>
        <Link to="/edit-listings" className='block py-3 px-4 hover:bg-gray-500'>
          Hotel Listing Editor
        </Link>
        <Link to="/listings" className='block py-3 px-4 hover:bg-gray-500'>
          View Hotels
        </Link>
        <Link to="/logout" className='block py-3 px-4 hover:bg-gray-500'>
          Log Out
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
