import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: ['Starters', 'South Indian', 'North Indian', 'Biryanis', 'Chinese', 'Desserts', 'Beverages'],
  },
  image: { type: String, default: '' },
  description: { type: String, default: '' },
  available: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Food', foodSchema);
