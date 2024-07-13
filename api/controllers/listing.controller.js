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