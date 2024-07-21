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

export const getAllListings = async (req, res) => {
    try {
        const listings = await Listing.find();
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const updateListing = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedListing = await Listing.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
};

export const getListingById = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.status(200).json(listing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
