import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('   Make sure MongoDB is running. You can install it or use MongoDB Atlas.');
    console.error('   Update MONGO_URI in .env if using a remote database.\n');
    process.exit(1);
  }
};

export default connectDB;
