import { Router } from 'express';
import { getAllFood, getFoodById, addFood, updateFood, deleteFood } from '../controllers/foodController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();

// Public
router.get('/', getAllFood);
router.get('/:id', getFoodById);

// Admin only
router.post('/', protect, adminOnly, addFood);
router.put('/:id', protect, adminOnly, updateFood);
router.delete('/:id', protect, adminOnly, deleteFood);

export default router;
