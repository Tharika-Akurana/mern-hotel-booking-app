import express from 'express';
import { createListing, deleteListing, getAllListings, getListingById, updateListing } from '../controllers/listing.controller.js';

const router = express.Router();

router.post('/create', createListing);
router.get('/all',getAllListings);
router.put('/update/:id', updateListing);
router.get('/:id', getListingById);
router.delete('/delete/:id', deleteListing);

export default router;