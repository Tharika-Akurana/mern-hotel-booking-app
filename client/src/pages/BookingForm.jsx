import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentMethod from "../components/booking/PaymentMethod";
import ResortLuxuryBoutiqueBooking from "../components/booking/ResortLuxuryBoutiqueBooking";
import RestaurantBooking from "../components/booking/RestaurantBooking";
import GeneratePdf from "../components/booking/GeneratePDF";
import AlertMessage from "../components/Notifications";

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hotel = {} } = location.state || {};
  const {
    hotelType,
    name,
    pricePerNight,
    priceDayFunction,
    priceNightFunction,
  } = hotel;

  const [showNotification, setShowNotification] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [stayOrFunction, setStayOrFunction] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [functionType, setFunctionType] = useState("");
  const [checkInTimeForRestaurant, setCheckInTimeForRestaurant] = useState("");
  const [checkOutTimeForRestaurant, setCheckOutTimeForRestaurant] =
    useState("");
  const [roomType, setRoomType] = useState("");

  useEffect(() => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const days = (checkOut - checkIn) / (1000 * 3600 * 24);

    // Calculate total price logic based on stay or function selection
    if (
      hotelType === "resort" ||
      hotelType === "boutique" ||
      hotelType === "luxury"
    ) {
      if (stayOrFunction === "stay" && checkInDate && checkOutDate) {
        // Calculate number of days
        setTotalPrice(days * pricePerNight * numberOfGuests);
      } else if (stayOrFunction === "function") {
        if (functionType === "day") {
          setTotalPrice(priceDayFunction * numberOfGuests);
        } else if (functionType === "night") {
          setTotalPrice(priceNightFunction * numberOfGuests);
        }
      }
    }

    if (
      (hotel.hotelType === "guestHouse" ||
        hotel.hotelType === "business" ||
        hotel.hotelType === "transient" ||
        hotel.hotelType === "budget") &&
      days > 0
    ) {
      // Calculate the total price
      const total = days * hotel.pricePerNight * numberOfGuests;
      setTotalPrice(total);
    }

    if (hotelType === "restaurant") {
      let durationInHours = 0;
      // Parse the time to hours
      const checkIn = new Date(`1970-01-01T${checkInTimeForRestaurant}:00`);
      const checkOut = new Date(`1970-01-01T${checkOutTimeForRestaurant}:00`);

      // Calculate time difference in hours
      durationInHours = (checkOut - checkIn) / (1000 * 60 * 60);

      if (durationInHours <= 0) {
        alert("Check-out time must be after check-in time");
        return;
      }
      // Calculate total price
      const totalPrice =
        durationInHours * numberOfGuests * hotel.pricePerPerson;
      setTotalPrice(totalPrice);
    }
  }, [
    checkInDate,
    checkOutDate,
    numberOfGuests,
    stayOrFunction,
    pricePerNight,
    priceDayFunction,
    priceNightFunction,
    checkInTimeForRestaurant,
    checkOutTimeForRestaurant,
    functionType,
  ]);

  const bookingDetails = {
    fullName,
    email,
    phone,
    name,
    hotelType,
    numberOfGuests,
    totalPrice,
    checkInTimeForRestaurant,
    checkOutTimeForRestaurant,
    stayOrFunction,
    functionType,
    checkInDate,
    checkOutDate,
    roomType,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const booking = await fetch("/api/booking/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          totalPrice,
          checkInDate,
          checkOutDate,
          numberOfGuests,
          stayOrFunction,
          functionType,
          checkInTimeForRestaurant,
          checkOutTimeForRestaurant,
          hotel,
        }),
      });
      setShowNotification(true);
      setTimeout(() => {
        GeneratePdf(bookingDetails);
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-cream p-8 w-2/3 md:w-6/12 mx-auto rounded-md shadow-md mt-5">
      <h2 className="text-2xl font-sans font-bold text-center mb-6">
        Hotel Reservation Form
      </h2>
      <p className="text-sm text-center mb-8">
        Tell us your preferences for a tailored booking experience!!!
      </p>

      <div className="flex">
        <label className="block font-serif w-1/3 mb-4">Hotel Name:</label>
        <span>{name}</span>
      </div>
      <div className="flex">
        <label className="block font-serif w-1/3 mb-4">Hotel Type:</label>
        <span>
          {hotelType === "restaurant"
            ? "Restaurant"
            : hotelType === "guestHouse"
            ? "Guest-House"
            : hotelType === "resort"
            ? "Resort"
            : hotelType === "budget"
            ? "Budget Hotel"
            : hotelType === "boutique"
            ? "Boutique Hotel"
            : hotelType === "luxury"
            ? "Luxury Hotel"
            : hotelType === "business"
            ? "Business Hotel"
            : hotelType === "transient"
            ? "Transient Hotel"
            : hotelType}
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Guest Details */}
        <div className="flex">
          <label className="block font-serif w-1/3 mb-3">Full Name:</label>
          <input
            type="text"
            id="guestName"
            name="guestName"
            className="w-2/3 mt-1 mb-3 ml-1 p-2 border border-gray-300 rounded-md"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        {/* Number of Guests */}
        <div className="flex">
          <label className="block font-serif w-1/3 mb-3">
            Number of Guests:
          </label>
          <input
            type="number"
            id="numberOfGuests"
            name="numberOfGuests"
            className="w-2/3 mt-1 mb-3 ml-1 p-2 border border-gray-300 rounded-md"
            min="1"
            defaultValue="1"
            onChange={(e) => setNumberOfGuests(e.target.value)}
            required
          />
        </div>

        {hotelType === "restaurant" && (
          <RestaurantBooking
            setCheckInDate={setCheckInDate}
            setCheckInTimeForRestaurant={setCheckInTimeForRestaurant}
            setCheckOutTimeForRestaurant={setCheckOutTimeForRestaurant}
          />
        )}

        {/* Resort, Luxury, and Boutique Hotel Booking */}
        {(hotelType === "resort" ||
          hotelType === "boutique" ||
          hotelType === "luxury") && (
          <ResortLuxuryBoutiqueBooking
            hotel={hotel}
            setCheckInDate={setCheckInDate}
            setCheckOutDate={setCheckOutDate}
            setStayOrFunction={setStayOrFunction}
            setFunctionType={setFunctionType}
          />
        )}

        {/*To handle guest and other checkin and checkout dates */}
        {hotelType === "guestHouse" ||
        hotelType === "business" ||
        hotelType === "transient" ||
        hotelType === "budget" ? (
          <>
            {/* Check-In Date */}
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
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </div>

            {/* Check-Out Date */}
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
                onChange={(e) => setCheckOutDate(e.target.value)}
              />
            </div>
          </>
        ) : null}

        {/* Total Price */}
        <div className="flex">
          <label className="block font-serif w-1/3 mb-3">Total Price:</label>
          <span>{totalPrice > 0 ? `$${totalPrice.toFixed(2)}` : "N/A"}</span>
        </div>

        {/* Room Type (Hidden for Restaurants and for functions) */}
        {hotelType !== "restaurant" && stayOrFunction !== "function" && (
          <div className="flex">
            <label className="block font-serif w-1/3 mb-3">Room Type:</label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
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

        {/* Payment Details */}
        {/* <PaymentMethod /> */}

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

      {showNotification && (
        <AlertMessage
          message="Booking created successfully"
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default BookingForm;
