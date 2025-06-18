import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config(); // must be called before using process.env

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    const dbName = process.env.DB_NAME;

    if (!mongoURI) throw new Error('MONGO_URI is undefined');
    console.log(mongoURI+dbName);
    await mongoose.connect(mongoURI, {
      dbName: dbName,
    });

    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;
