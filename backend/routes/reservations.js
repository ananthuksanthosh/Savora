import { Router } from 'express';
import { createReservation, getMyReservations, getAllReservations, updateReservationStatus, deleteReservation } from '../controllers/reservationController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();

router.post('/', protect, createReservation);
router.get('/my', protect, getMyReservations);
router.get('/', protect, adminOnly, getAllReservations);
router.put('/:id/status', protect, adminOnly, updateReservationStatus);
router.delete('/:id', protect, adminOnly, deleteReservation);

export default router;
