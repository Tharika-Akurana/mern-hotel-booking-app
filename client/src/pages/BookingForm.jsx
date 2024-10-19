import React, { useState } from "react";

const BookingForm = () => {
  const [hotelType, setHotelType] = useState("");
  const [roomTypeVisible, setRoomTypeVisible] = useState(true);
  const [stayOrFunction, setStayOrFunction] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleHotelTypeChange = (e) => {
    const selectedHotelType = e.target.value;
    setHotelType(selectedHotelType);
    setRoomTypeVisible(selectedHotelType !== "restaurant");
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="bg-cream p-8 w-2/3 md:w-6/12 mx-auto rounded-md shadow-md mt-5">
      <h2 className="text-2xl font-sans font-bold text-center mb-6">
        Hotel Reservation Form
      </h2>
      <p className="text-sm text-center mb-8">
        Tell us your preferences for a tailored booking experience that
        guarantees a memorable stay for dining, business, or special events.
      </p>
      <form>
        {/* Guest Details */}
        <div className="flex">
          <label className="block font-serif w-1/3 mb-3">Full Name:</label>
          <input
            type="text"
            id="guestName"
            name="guestName"
            className="w-2/3 mt-1 mb-3 ml-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="flex">
          <label className="block font-serif w-1/3 mb-3">Email Address: </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-2/3 mt-1 mb-3 ml-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="flex">
          <label className="block font-serif w-1/3 mb-3">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-2/3 mt-1 mb-3 ml-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        {/* Hotel Type Selection */}
        <div className="flex">
          <label className="block font-serif w-1/3 mb-3">Hotel Type:</label>
          <select
            id="hotelType"
            name="hotelType"
            className="w-2/3 mt-1 mb-3 ml-1 p-2 border border-gray-300 rounded-md"
            value={hotelType}
            onChange={handleHotelTypeChange}
            required
          >
            <option value="">Select Hotel Type</option>
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

        {/* Stay or Function Option for Resort, Boutique and Luxury Hotels*/}
        {["resort", "boutique", "luxury"].includes(hotelType) && (
          <div className="flex">
            <label className="block font-serif w-1/3 mb-3">
              Stay or Function:
            </label>
            <select
              value={stayOrFunction}
              onChange={(e) => setStayOrFunction(e.target.value)}
              className="w-2/3 mt-1 mb-3 ml-1 p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Option</option>
              <option value="stay">Stay</option>
              <option value="function">Function</option>
            </select>
          </div>
        )}

        {/* Conditional Check-in and Check-out Dates or Function Selection */}
        {stayOrFunction === "stay" ? (
          <>
            <div className="flex">
              <label className="block font-serif w-1/3 mb-3">
                Check-In Date:
              </label>
              <input
                type="date"
                id="checkIn"
                name="checkIn"
                className="w-2/3 mt-1 mb-3 ml-1 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex">
              <label className="block font-serif w-1/3 mb-3">
                Check-Out Date:
              </label>
              <input
                type="date"
                id="checkOut"
                name="checkOut"
                className="w-2/3 mt-1 mb-3 ml-1 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </>
        ) : stayOrFunction === "function" ? (
          <>
            <div className="flex">
              <label className="block font-serif w-1/3 mb-3">
                Function Type:
              </label>
              <select
                id="functionType"
                name="functionType"
                className="w-2/3 mt-1 mb-3 ml-1 p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Function Type</option>
                <option value="day">Day Function</option>
                <option value="night">Night Function</option>
              </select>
            </div>
            <div className="flex">
              <label className="block font-serif w-1/3 mb-3">Date:</label>
              <input
                type="date"
                id="functionDate"
                name="functionDate"
                className="w-2/3 mt-1 mb-3 ml-1 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </>
        ) : hotelType == "restaurant" ? (
          <>
            <div className="flex">
              <label className="block font-serif w-1/3 mb-3">
                Check-In Time:
              </label>
              <input
                type="time"
                id="checkIn"
                name="checkIn"
                className="w-2/3 mt-1 mb-3 ml-1 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex">
              <label className="block font-serif w-1/3 mb-3">
                Check-Out Time:
              </label>
              <input
                type="time"
                id="checkOut"
                name="checkOut"
                className="w-2/3 mt-1 mb-3 ml-1 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </>
        ) : (
          hotelType !== "restaurant" && (
            <>
              <div className="flex">
                <label className="block font-serif w-1/3 mb-3">
                  Check-In Date:
                </label>
                <input
                  type="date"
                  id="checkIn"
                  name="checkIn"
                  className="w-2/3 mt-1 mb-3 ml-1 p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex">
                <label className="block font-serif w-1/3 mb-3">
                  Check-Out Date:
                </label>
                <input
                  type="date"
                  id="checkOut"
                  name="checkOut"
                  className="w-2/3 mt-1 mb-3 ml-1 p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </>
          )
        )}

        {/* Room Type (Hidden for Restaurants) */}
        {roomTypeVisible && (
          <div className="flex">
            <label className="block font-serif w-1/3 mb-3">Room Type:</label>
            <select
              id="roomType"
              name="roomType"
              className="w-2/3 mt-1 mb-3 ml-1 p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Room Type</option>
              <option value="standard">Standard</option>
              <option value="deluxe">Deluxe</option>
              <option value="suite">Suite</option>
            </select>
          </div>
        )}

        {/* Number of Guests */}
        <div className="flex">
          <label className="block font-serif w-1/3 mb-3">
            Number of Guests:
          </label>
          <input
            type="number"
            id="guests"
            name="guests"
            className="w-2/3 mt-1 mb-3 ml-1 p-2 border border-gray-300 rounded-md"
            min="1"
            required
          />
        </div>

        {/* Payment Details */}
        <div className="flex">
          <label className="block font-serif w-1/3 mb-3">Payment Method:</label>
          <select
            id="payment"
            name="payment"
            className="w-2/3 mt-1 mb-3 ml-1 p-2 border border-gray-300 rounded-md"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            required
          >
            <option value="">Select Payment Method</option>
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bankTransfer">Online Transfer</option>
          </select>
        </div>

        {/* Conditionally render fields based on the selected payment method */}
        {paymentMethod === "creditCard" && (
          <>
            <div className="flex">
              <label className="block font-serif w-1/3 mb-3">
                Card Number:
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                className="w-2/3 mt-1 mb-3 ml-1 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block font-serif mb-3 text-center">
                  Expiry Date:{" "}
                </label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  placeholder="MM/YY"
                  className="w-full mt-1 mb-3 p-2 border border-gray-300 rounded-md text-center"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block font-serif mb-3 text-center">
                  CVV:
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  placeholder="3 digits"
                  className="w-full mt-1 mb-3 p-2 border border-gray-300 rounded-md text-center"
                  required
                />
              </div>
            </div>
          </>
        )}

        {paymentMethod === "paypal" && (
          <div className="flex">
            <label className="block font-serif w-1/3 mb-3">PayPal Email:</label>
            <input
              type="email"
              id="paypalEmail"
              name="paypalEmail"
              className="w-2/3 mt-1 mb-3 ml-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        )}

        {paymentMethod === "bankTransfer" && (
          <div className="flex">
            <label className="block font-serif w-1/3 mb-3">
              Bank Account Number:
            </label>
            <input
              type="text"
              id="bankAccount"
              name="bankAccount"
              className="w-2/3 mt-1 mb-3 ml-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        )}
        {/* Submit Button */}
        <div className="flex justify-center mt-5">
          <button
            type="submit"
            className="w-1/3 bg-darkGold text-white p-2 rounded-md hover:opacity-90 justify-center"
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
