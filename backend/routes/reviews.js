import { Router } from 'express';
import { createReview, getAllReviews, deleteReview } from '../controllers/reviewController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();

router.get('/', getAllReviews);
router.post('/', protect, createReview);
router.delete('/:id', protect, adminOnly, deleteReview);

export default router;
