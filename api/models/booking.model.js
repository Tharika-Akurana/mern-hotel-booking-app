import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  checkInDate: {
    type: Date,
  },
  checkOutDate: {
    type: Date,
  },
  numberOfGuests: {
    type: Number,
    required: true,
  },
  stayOrFunction: {
    type: String,
  },
  functionType: {
    type: String,
  },
  checkInTimeForRestaurant: {
    type: String,
  },
  checkOutTimeForRestaurant: {
    type: String,
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing", // Reference the Listing model
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
