import { FaSearch } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);
    const location = useLocation();
    const showHeader = location.pathname !== '/'&& location.pathname !== '/admin-sign-in' && location.pathname !== '/sign-in' && location.pathname !== '/sign-up'; // Exclude header from the Welcome page
    
  
    if (!showHeader) return null;

    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/'>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-col items-center'>
                        <span className='text-slate-500'>
                            Stay&Dine
                        </span>
                        <span className='text-slate-700'>
                            Hub
                        </span>
                    </h1>
                </Link>

                <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                    <input
                        type="text"
                        placeholder="Search..."
                        className='bg-transparent focus:outline-none w-24 sm:w-64'
                    />
                    <FaSearch className='text-slate-600' />
                </form>

                <ul className='flex gap-4'>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>
                        <Link to='/Home'>Home</Link>
                    </li>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>
                        <Link to='/about'>About</Link>
                    </li>
                    <li>
                        <Link to='/profile'>
                            {currentUser ? (
                                <img
                                    className='rounded-full h-7 w-7 object-cover'
                                    src={currentUser.avatar}
                                    alt='profile'
                                />
                            ) : (
                                <span className='text-slate-700 hover:underline'>
                                    Sign in
                                </span>
                            )}
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}
