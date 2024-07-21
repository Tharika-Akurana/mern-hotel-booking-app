import express from 'express';
import { createListing, getAllListings } from '../controllers/listing.controller.js';

const router = express.Router();

router.post('/create', createListing);
router.get('/all',getAllListings);

export default router;