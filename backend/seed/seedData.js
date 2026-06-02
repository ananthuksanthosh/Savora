import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Food from '../models/Food.js';
import Review from '../models/Review.js';

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected for seeding');

    // Clear existing data
    await User.deleteMany();
    await Food.deleteMany();
    await Review.deleteMany();

    // Seed Admin
    const admin = await User.create({
      name: 'Restaurant Admin',
      email: 'admin@savora.com',
      password: 'admin',
      mobile: '9999999999',
      role: 'admin',
    });
    console.log('👤 Admin created: admin@savora.com / admin');

    // Seed Customer
    const customer = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'john123',
      mobile: '9876543210',
      role: 'customer',
    });
    console.log('👤 Customer created: john@example.com / john123');

    // Seed Food Items
    const foodItems = [
      { name: 'Chicken Biryani', price: 249, category: 'Biryanis', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop', available: true, description: 'Fragrant basmati rice cooked with tender chicken and aromatic spices.' },
      { name: 'Malabar Biryani', price: 299, category: 'Biryanis', image: 'https://images.unsplash.com/photo-1589302168068-964664d93cb0?q=80&w=600&auto=format&fit=crop', available: true, description: 'Traditional Kerala style biryani with rich flavors.' },
      { name: 'Butter Chicken', price: 279, category: 'North Indian', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=600&auto=format&fit=crop', available: true, description: 'Creamy and rich tomato-based curry with tender chicken pieces.' },
      { name: 'Paneer Butter Masala', price: 239, category: 'North Indian', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?q=80&w=600&auto=format&fit=crop', available: true, description: 'Cottage cheese cubes in a rich, creamy tomato gravy.' },
      { name: 'Masala Dosa', price: 129, category: 'South Indian', image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?q=80&w=600&auto=format&fit=crop', available: true, description: 'Crispy rice crepe stuffed with spiced potato filling.' },
      { name: 'Ghee Roast', price: 169, category: 'South Indian', image: 'https://images.unsplash.com/photo-1649931751101-72f8216dffcc?q=80&w=600&auto=format&fit=crop', available: true, description: 'Ultra-crispy dosa roasted in generous amounts of pure ghee.' },
      { name: 'Kerala Porotta', price: 25, category: 'South Indian', image: 'https://images.unsplash.com/photo-1626200926735-a50e1faef845?q=80&w=600&auto=format&fit=crop', available: true, description: 'Flaky, layered flatbread from Kerala.' },
      { name: 'Beef Fry', price: 249, category: 'Starters', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=600&auto=format&fit=crop', available: true, description: 'Spicy Kerala style beef roast with coconut slivers.' },
      { name: 'Shawarma', price: 149, category: 'Starters', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=600&auto=format&fit=crop', available: true, description: 'Middle eastern wrap with spiced chicken and garlic mayo.' },
      { name: 'Falooda', price: 119, category: 'Desserts', image: 'https://images.unsplash.com/photo-1563805042-7684c8a9e9ce?q=80&w=600&auto=format&fit=crop', available: true, description: 'Rich layered dessert with rose syrup, vermicelli, and ice cream.' },
      { name: 'Chicken 65', price: 199, category: 'Starters', image: 'https://images.unsplash.com/photo-1610057099443-fde6c99db9e1?q=80&w=600&auto=format&fit=crop', available: true, description: 'Spicy deep-fried chicken with curry leaves and chillies.' },
      { name: 'Veg Manchurian', price: 179, category: 'Chinese', image: 'https://images.unsplash.com/photo-1645696301019-35adcc0b5765?q=80&w=600&auto=format&fit=crop', available: true, description: 'Deep fried vegetable balls in spicy manchurian sauce.' },
      { name: 'Mango Lassi', price: 89, category: 'Beverages', image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=600&auto=format&fit=crop', available: true, description: 'Creamy yogurt smoothie blended with ripe mangoes.' },
      { name: 'Masala Chai', price: 49, category: 'Beverages', image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=600&auto=format&fit=crop', available: true, description: 'Classic Indian spiced tea brewed to perfection.' },
      { name: 'Gulab Jamun', price: 99, category: 'Desserts', image: 'https://images.unsplash.com/photo-1666190050346-72e8e3b2c17e?q=80&w=600&auto=format&fit=crop', available: true, description: 'Soft milk-solid balls soaked in cardamom-flavored sugar syrup.' },
    ];

    await Food.insertMany(foodItems);
    console.log(`🍛 ${foodItems.length} food items seeded`);

    // Seed Reviews
    const reviews = [
      { user: customer._id, userName: 'John Doe', rating: 5, comment: 'Best biryani I have ever had! The flavors are incredible.' },
      { user: admin._id, userName: 'Restaurant Admin', rating: 4, comment: 'Great ambiance and wonderful food. Highly recommended.' },
    ];

    await Review.insertMany(reviews);
    console.log(`⭐ ${reviews.length} reviews seeded`);

    console.log('\n🎉 Seed completed successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedData();
