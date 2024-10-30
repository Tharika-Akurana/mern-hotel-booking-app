import express from "express";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/create", createBooking);
router.get("/all", getAllBookings);
router.delete("/delete/:id", deleteBooking);

export default router;
