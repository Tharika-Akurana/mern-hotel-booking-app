import React from "react";
import { useLocation } from "react-router-dom";

const BookingDetails = () => {
  const location = useLocation();
  const { booking } = location.state || {};

  const {
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
  } = booking;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-DeepNavyBlue">
        Booking Details
      </h1>

      {/* Guest Information */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 border-b-2 border-DeepNavyBlue pb-2">
          Guest Information
        </h2>
        <table className="min-w-full">
          <tbody>
            <tr>
              <td className="border-b px-4 py-2">
                <strong>Full Name:</strong>
              </td>
              <td className="border-b px-4 py-2">{fullName}</td>
            </tr>
            <tr>
              <td className="border-b px-4 py-2">
                <strong>Email:</strong>
              </td>
              <td className="border-b px-4 py-2">{email}</td>
            </tr>
            <tr>
              <td className="border-b px-4 py-2">
                <strong>Phone:</strong>
              </td>
              <td className="border-b px-4 py-2">{phone}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Booking Information */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 border-b-2 border-DeepNavyBlue pb-2">
          Booking Information
        </h2>
        <table className="min-w-full">
          <tbody>
            <tr>
              <td className="border-b px-4 py-2">
                <strong>Hotel Name:</strong>
              </td>
              <td className="border-b px-4 py-2">{hotel.name}</td>
            </tr>
            <tr>
              <td className="border-b px-4 py-2">
                <strong>Hotel Type:</strong>
              </td>
              <td className="border-b px-4 py-2">{hotel.hotelType}</td>
            </tr>
            <tr>
              <td className="border-b px-4 py-2">
                <strong>Number of Guests:</strong>
              </td>
              <td className="border-b px-4 py-2">{numberOfGuests}</td>
            </tr>
            <tr>
              <td className="border-b px-4 py-2">
                <strong>Total Price:</strong>
              </td>
              <td className="border-b px-4 py-2">${totalPrice.toFixed(2)}</td>
            </tr>
            {/* Conditional Information based on Hotel Type */}
            {hotel.hotelType === "restaurant" ? (
              <>
                <tr>
                  <td className="border-b px-4 py-2">
                    <strong>Check-In Time:</strong>
                  </td>
                  <td className="border-b px-4 py-2">
                    {checkInTimeForRestaurant}
                  </td>
                </tr>
                <tr>
                  <td className="border-b px-4 py-2">
                    <strong>Check-Out Time:</strong>
                  </td>
                  <td className="border-b px-4 py-2">
                    {checkOutTimeForRestaurant}
                  </td>
                </tr>
              </>
            ) : (
              <>
                <tr>
                  <td className="border-b px-4 py-2">
                    <strong>Stay or Function:</strong>
                  </td>
                  <td className="border-b px-4 py-2">{stayOrFunction}</td>
                </tr>
                {stayOrFunction === "function" ? (
                  <tr>
                    <td className="border-b px-4 py-2">
                      <strong>Function Type:</strong>
                    </td>
                    <td className="border-b px-4 py-2">{functionType}</td>
                  </tr>
                ) : (
                  <>
                    <tr>
                      <td className="border-b px-4 py-2">
                        <strong>Check-In Date:</strong>
                      </td>
                      <td className="border-b px-4 py-2">
                        {new Date(checkInDate).toLocaleDateString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b px-4 py-2">
                        <strong>Check-Out Date:</strong>
                      </td>
                      <td className="border-b px-4 py-2">
                        {new Date(checkOutDate).toLocaleDateString()}
                      </td>
                    </tr>
                  </>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingDetails;
