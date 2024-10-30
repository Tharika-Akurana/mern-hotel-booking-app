import React, { useState } from "react";

export const RestaurantBooking = ({
  setCheckInDate,
  setCheckInTimeForRestaurant,
  setCheckOutTimeForRestaurant,
}) => {
  return (
    <div>
      {/* Check-In Date */}
      <div className="flex">
        <label className="block font-serif w-1/3 mb-3">Date:</label>
        <input
          type="date"
          id="checkIn"
          name="checkIn"
          className="w-2/3 mt-1 mb-3 ml-1 p-2 border border-gray-300 rounded-md"
          required
          onChange={(e) => setCheckInDate(e.target.value)}
        />
      </div>
      <div className="flex">
        <label className="block font-serif w-1/3 mb-3">Check-In Time:</label>
        <input
          type="time"
          id="checkIn"
          name="checkIn"
          step="1800"
          className="w-2/3 mt-1 mb-3 ml-1 p-2 border border-gray-300 rounded-md"
          //value={checkInTime}
          onChange={(e) => setCheckInTimeForRestaurant(e.target.value)}
          pattern="[0-9]{2}:[0-9]{2}"
          required
        />
      </div>
      <div className="flex">
        <label className="block font-serif w-1/3 mb-3">Check-Out Time:</label>
        <input
          type="time"
          id="checkOut"
          name="checkOut"
          className="w-2/3 mt-1 mb-3 ml-1 p-2 border border-gray-300 rounded-md"
          //value={checkOutTime}
          onChange={(e) => setCheckOutTimeForRestaurant(e.target.value)}
          required
        />
      </div>
    </div>
  );
};
