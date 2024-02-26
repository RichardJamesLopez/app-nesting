import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connect = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;
    connection.on('connected', () => {
      console.log('MongoDB connected successfully!');
    });
    connection.on('error', (error) => {
      console.log(
        'MongoDB connection error, please make sure MongoDB is running' + error,
      );
      process.exit();
    });
  } catch (error) {
    console.log('Something went wrong!');
    console.log(error);
  }
};

