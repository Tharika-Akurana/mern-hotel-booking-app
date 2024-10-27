import React, { useState } from "react";

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div>
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
            <label className="block font-serif w-1/3 mb-3">Card Number:</label>
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
              <label className="block font-serif mb-3 text-center">CVV:</label>
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
    </div>
  );
};

export default PaymentMethod;
