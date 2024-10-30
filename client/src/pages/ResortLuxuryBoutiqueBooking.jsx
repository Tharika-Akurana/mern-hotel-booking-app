import React, { useState, useEffect } from "react";

export const ResortLuxuryBoutiqueBooking = ({
  setCheckInDate,
  setCheckOutDate,
  setStayOrFunction,
  setFunctionType,
}) => {
  const [stayOrFunction, setStayOrFunctionLocal] = useState("");

  return (
    <div>
      <div className="flex">
        <label className="block font-serif w-1/3 mb-3">Stay or Function:</label>
        <select
          value={stayOrFunction}
          onChange={(e) => {
            setStayOrFunction(e.target.value);
            setStayOrFunctionLocal(e.target.value);
          }}
          className="w-2/3 mt-1 mb-3 ml-1 p-2 border border-gray-300 rounded-md"
          required
        >
          <option value="">Select Option</option>
          <option value="stay">Stay</option>
          <option value="function">Function</option>
        </select>
      </div>

      {/* If Stay is selected, show Check-In/Check-Out dates */}
      {stayOrFunction === "stay" && (
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
              onChange={(e) => {
                //setCheckInDateLocal(e.target.value);
                setCheckInDate(e.target.value);
              }}
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
              onChange={(e) => {
                //setCheckOutDateLocal(e.target.value);
                setCheckOutDate(e.target.value);
              }}
            />
          </div>
        </>
      )}

      {/* If Function is selected, show Function Type and Date */}
      {stayOrFunction === "function" && (
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
              onChange={(e) => setFunctionType(e.target.value)}
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
              onChange={(e) => setCheckInDate(e.target.value)}
            />
          </div>
        </>
      )}
    </div>
  );
};
