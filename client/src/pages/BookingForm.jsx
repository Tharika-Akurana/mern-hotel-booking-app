import React, { useState } from "react";

const BookingForm = () => {
  const [hotelType, setHotelType] = useState("");
  const [roomTypeVisible, setRoomTypeVisible] = useState(true);

  const handleHotelTypeChange = (e) => {
    const selectedHotelType = e.target.value;
    setHotelType(selectedHotelType);
    setRoomTypeVisible(selectedHotelType !== "restaurant");
  };

  return (
    <div className="bg-gray-100 p-8 max-w-lg mx-auto rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        Hotel Booking Form
      </h2>
      <form>
        {/* Guest Details */}
        <div className="mb-4">
          <label htmlFor="guestName" className="block text-gray-700">
            Full Name:
          </label>
          <input
            type="text"
            id="guestName"
            name="guestName"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email Address:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700">
            Phone Number:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Hotel Type Selection */}
        <div className="mb-4">
          <label htmlFor="hotelType" className="block text-gray-700">
            Select Hotel Type:
          </label>
          <select
            id="hotelType"
            name="hotelType"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            value={hotelType}
            onChange={handleHotelTypeChange}
            required
          >
            <option value="">--Select Hotel Type--</option>
            <option value="restaurant">Restaurant</option>
            <option value="resort">Resort</option>
            <option value="budget">Budget Hotel</option>
            <option value="boutique">Boutique Hotel</option>
            <option value="luxury">Luxury Hotel</option>
            <option value="guestHouse">Guest House</option>
            <option value="business">Business Hotel</option>
            <option value="transient">Transient Hotel</option>
          </select>
        </div>

        {/* Check-in and Check-out Dates */}
        <div className="mb-4">
          <label htmlFor="checkIn" className="block text-gray-700">
            Check-In Date:
          </label>
          <input
            type="date"
            id="checkIn"
            name="checkIn"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="checkOut" className="block text-gray-700">
            Check-Out Date:
          </label>
          <input
            type="date"
            id="checkOut"
            name="checkOut"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Room Type (Hidden for Restaurants) */}
        {roomTypeVisible && (
          <div className="mb-4">
            <label htmlFor="roomType" className="block text-gray-700">
              Room Type:
            </label>
            <select
              id="roomType"
              name="roomType"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">--Select Room Type--</option>
              <option value="standard">Standard</option>
              <option value="deluxe">Deluxe</option>
              <option value="suite">Suite</option>
            </select>
          </div>
        )}

        {/* Number of Guests */}
        <div className="mb-4">
          <label htmlFor="guests" className="block text-gray-700">
            Number of Guests:
          </label>
          <input
            type="number"
            id="guests"
            name="guests"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Payment Details */}
        <div className="mb-4">
          <label htmlFor="payment" className="block text-gray-700">
            Payment Method:
          </label>
          <select
            id="payment"
            name="payment"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">--Select Payment Method--</option>
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bankTransfer">Bank Transfer</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-gray-700">
            Card Number:
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4 flex gap-4">
          <div>
            <label htmlFor="expiry" className="block text-gray-700">
              Expiry Date:
            </label>
            <input
              type="text"
              id="expiry"
              name="expiry"
              placeholder="MM/YY"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="cvv" className="block text-gray-700">
              CVV:
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              placeholder="3 digits"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
