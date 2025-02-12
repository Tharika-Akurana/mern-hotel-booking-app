import express from "express";
import {
  createListing,
  deleteListing,
  getAllListings,
  getListingById,
  saveAllListings,
  updateListing,
  searchListings,
} from "../controllers/listing.controller.js";

const router = express.Router();

router.get("/search", searchListings);
router.post("/create", createListing);
router.get("/all", getAllListings);
router.put("/update/:id", updateListing);
router.get("/:id", getListingById);
router.delete("/delete/:id", deleteListing);
router.post("/save-all", saveAllListings);

export default router;
