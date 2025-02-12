import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
  try {
    const newListing = new Listing(req.body);
    const savedListing = await newListing.save();
    res.status(201).json(savedListing);
  } catch (error) {
    next(error);
  }
};

export const getAllListings = async (req, res, next) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListingById = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteListing = await Listing.findByIdAndDelete(id);
    if (!deleteListing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const saveAllListings = async (req, res, next) => {
  try {
    const listings = req.body;
    if (!Array.isArray(listings)) {
      return res
        .status(400)
        .json({ message: "Invalid data fromat. Expected an array" });
    }

    const savedListings = [];
    for (const listing of listings) {
      const savedListing = await Listing.findByIdAndUpdate(
        listing._id,
        listing,
        { new: true, upsert: true }
      );
      savedListings.push(savedListing);
    }

    res
      .status(200)
      .json({ message: "All listings saved successfully", savedListings });
  } catch (error) {
    next(error);
  }
};

export const searchListings = async (req, res, next) => {
  try {
    const {
      name,
      address,
      hotelType,
      minPrice,
      maxPrice,
      starRating,
      sort,
      order,
      limit,
      startIndex,
    } = req.query;

    // Build a dynamic query
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" }; // Case-insensitive search
    }

    if (address) {
      query.address = { $regex: address, $options: "i" };
    }

    if (hotelType) {
      query.hotelType = { $regex: hotelType, $options: "i" };
    }

    if (minPrice) {
      query.pricePerNight = {
        ...query.pricePerNight,
        $gte: parseFloat(minPrice),
      };
    }

    if (maxPrice) {
      query.pricePerNight = {
        ...query.pricePerNight,
        $lte: parseFloat(maxPrice),
      };
    }

    if (starRating) {
      query.starRating = parseInt(starRating);
    }

    // Set sorting (default to 'createdAt' descending)
    const sortBy = sort || "createdAt";
    const sortOrder = order === "asc" ? 1 : -1;

    // Pagination (default limit = 10, default startIndex = 0)
    const limitResults = parseInt(limit) || 10;
    const skipResults = parseInt(startIndex) || 0;

    // Fetch listings with filtering, sorting, and pagination
    const listings = await Listing.find(query)
      .sort({ [sortBy]: sortOrder }) // Sorting
      .limit(limitResults) // Pagination: limit results
      .skip(skipResults); // Pagination: skip results

    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
