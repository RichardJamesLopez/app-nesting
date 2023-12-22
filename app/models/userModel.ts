import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  address: {
    type: String,
    required: [true, 'Please provide an address'],
    unique: true,
  },
});

const User = models.User || model('User', userSchema);
export default User;
