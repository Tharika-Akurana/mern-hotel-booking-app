import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Images/Logo.png";

const Sidebar = () => {
  return (
    <div className="w-44 h-auto bg-DeepNavyBlue text-white flex flex-col justify-between">
      <div className="mb-8"></div>
      <div className="p-4 text-center mb-4">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className=" hover:text-darkGold mx-auto mb-4 w-16 h-16 rounded-full"
          />
          <h1 className="font-bold text-sm sm:text-xl flex flex-col items-center mb-4">
            <span className="text-slate-300 hover:text-darkGold">
              <span className="block">Stay&Dine</span>
              <span className="block">Hub</span>
            </span>
          </h1>
        </Link>
      </div>
      <nav className="flex-grow items-center justify-center">
        <Link
          to="/create-listings"
          className="block py-3 px-4 hover:text-goldenYellow "
        >
          Add Hotel
        </Link>
        <Link
          to="/edit-listings"
          className="block py-3 px-4 hover:text-goldenYellow"
        >
          Edit Hotel
        </Link>
        <Link
          to="/listings"
          className="block py-3 px-4 hover:text-goldenYellow"
        >
          Hotels
        </Link>
        <Link
          to="/bookings"
          className="block py-3 px-4 hover:text-goldenYellow"
        >
          Bookings
        </Link>
        <Link to="/logout" className="block py-3 px-4 hover:text-goldenYellow">
          Logout
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
