import React, { useState, useEffecct, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminBookingList = () => {
  const navigate = useNavigate();
  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("api/booking/all", {
          method: "GET",
        });
        const bookings = await res.json();

        // Fetch hotel details for each booking
        const updatedBookings = await Promise.all(
          bookings.map(async (booking) => {
            const hotelRes = await fetch(`api/listing/${booking.hotel}`, {
              method: "GET",
            });
            const hotel = await hotelRes.json();

            return { ...booking, hotel };
          })
        );

        setBookingList(updatedBookings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookings();
  }, []);

  const handleViewMore = (bookingId) => {
    const selectedBooking = bookingList.find(
      (booking) => booking._id === bookingId
    );
    if (selectedBooking) {
      navigate(`/booking-details`, { state: { booking: selectedBooking } });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Booking List</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="text-left bg-gray-800 text-white">
            <th className="px-4 py-2">Hotel</th>
            <th className="px-4 py-2">Full Name</th>
            <th className="px-4 py-2">Total Price</th>
            <th className="px-4 py-2">Check-in Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookingList.map((booking) => (
            <tr key={booking._id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{booking.hotel.name}</td>
              <td className="px-4 py-2">{booking.fullName}</td>
              <td className="px-4 py-2">${booking.totalPrice.toFixed(2)}</td>
              <td className="px-4 py-2">
                {new Date(booking.checkInDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleViewMore(booking._id)}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                >
                  View More
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookingList;
