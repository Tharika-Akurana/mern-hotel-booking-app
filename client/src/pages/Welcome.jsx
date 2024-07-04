import React from 'react';

const underlineStyle = {
    borderBottom: '2px solid',
    display: 'inline-block',
    lineHeight: '1.5em',
    position: 'relative',
    verticalAlign: 'middle',
    width: 'auto',
    fontSize: 'inherit'
};

export default function Welcome() {
    return (
        <div className="relative h-screen w-full flex items-center justify-center">
            <div className="absolute inset-1 bg-fixed bg-cover bg-center bg-no-repeat" 
            style={{backgroundImage: "url('https://cdn.pixabay.com/photo/2016/11/17/09/28/hotel-1831072_1280.jpg')", filter: "blur(3px)"}}>
            </div>
            <div className="absolute onset-0 bg-black opacity-10"></div>
            <div className="relative z-10 bg-white bg-opacity-55 max-w-10xl mx-auto p-20 rounded-2xl shadow-lg text-center">
                <h1 className="text-4xl font-bold text-center mb-2">
                    Stay&Dine Hub
                </h1>
                <h2 className="text-2xl font-semibold text-center mb-10">
                    <span style={underlineStyle}>Hotels</span> 
                    <span style={underlineStyle}>and</span>
                    <span style={underlineStyle}>Resturents</span>
                </h2>
                <p className="text-lg text-center mb-2">
                    Welcome to Stay&Dine Hub
                </p>
                <p className="text-lg text-center mb-2">
                    Explore Hotels and Restaurants in Sri Lanka...
                </p>
                <p className="text-lg text-center mb-10">
                    Book Your Perfect Stay or Dining Experience Now
                </p>
                <button onClick={()=>window.location.href = '/home'}
                className="bg-blue-500 text-white px-6 py-2.5 rounded-lg mb-3 hover:big=blue-600">
                        Explore Now
                </button>
                <br />
                <button onClick={() => window.location.href = '/admin-sign-in'} className="bg-gray-500 text-white px-6 py-2.5 rounded-lg hover:bg-gray-600">
                    Sign In as Admin
                </button>
            </div>
        </div>
    );
}