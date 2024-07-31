import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    hotelType: {
        type: String,
        required: true
    },
    pricePerPerson: {
        type: Number
    },
    pricePerNight: {
        type: Number
    },
    priceDayFunction: {
        type: Number
    },
    priceNightFunction: {
        type: Number
    },
    starRating: {
        type: Number,
        min: 1,
        max: 5
    },
    facilities: {
        type: String
    },
    imageUrls: {
        type: Array,
        required: true
    }
}, {timestamps: true}
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;