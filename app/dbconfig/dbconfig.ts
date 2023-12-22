import mongoose from 'mongoose';

export const connect = async () => {
  try {
    // mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI!);
    mongoose.connect(
      'mongodb+srv://emrichmichaelperrier:bahdyI0zXILn5P4c@cluster0.hfcfk5g.mongodb.net/',
    );
    const connection = mongoose.connection;
    connection.on('connected', () => {
      console.log('MongoDB connected successfully!');
    });
    connection.on('error', (error) => {
      console.log(
        'MongoDB connection error, plase make sure MongoDB is running' + error,
      );
      process.exit();
    });
  } catch (error) {
    console.log('Something went wrong!');
    console.log(error);
  }
};
