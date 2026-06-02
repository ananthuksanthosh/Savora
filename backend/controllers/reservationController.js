import Reservation from '../models/Reservation.js';

// POST /api/reservations  (Authenticated user)
export const createReservation = async (req, res) => {
  try {
    const { date, time, guests, specialRequest } = req.body;

    if (!date || !time || !guests) {
      return res.status(400).json({ message: 'Date, time, and guest count are required' });
    }

    const reservation = await Reservation.create({
      user: req.user._id,
      customerName: req.user.name,
      mobile: req.user.mobile || req.body.mobile || '',
      date,
      time,
      guests,
      specialRequest,
    });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/reservations/my  (Authenticated user — own reservations)
export const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/reservations  (Admin — all)
export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/reservations/:id/status  (Admin)
export const updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });

    reservation.status = status;
    const updated = await reservation.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/reservations/:id  (Admin)
export const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    res.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
