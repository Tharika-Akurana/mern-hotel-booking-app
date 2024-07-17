import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {

    return (
        <div className = 'w-64 h-auto bg-goldLeaf text-white flex flex-col justify-between'>
            <div className='mb-32'></div>
                <div className='p-4 text-center mb-36'>
                    <h1 className='text-2xl font-bold underline'>
                        <div>
                        Stay&Dine
                        </div>
                        Hub
                    </h1>
                </div>
            <nav className='flex-grow text-center'>

                <Link to = "/create-listings" className='block py-6 px-4 hover:bg-darkGold'>
                    New Hotel Listing
                </Link>

                <Link to = "/edit-listings" className='block py-6 px-4 hover:bg-darkGold' >
                    Hotel Listing Editor
                </Link>

                <Link to = "/listings" className='block py-6 px-4 hover:bg-darkGold' >
                    View Hotels
                </Link>

                <Link to = "/logout" className='block py-6 px-4 hover:bg-darkGold' >
                    Log Out
                </Link>

            </nav>
            
        </div>
    );
};

export default Sidebar;