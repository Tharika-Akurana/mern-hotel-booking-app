import Booking from "../models/booking.model.js";

export const createBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.log(error);
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const booking = await Booking.find();

    res.status(201).json(booking);
  } catch (error) {
    console.log(error);
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedbooking = await Booking.findByIdAndDelete(id);
    if (!deletedbooking) {
      return res.status(400).json({ message: "booking not found" });
    }

    res.status(200).json({ massage: "booking deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
