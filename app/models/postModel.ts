import { Schema, model, models } from 'mongoose';
import { unique } from 'next/dist/build/utils';

const postSchema = new Schema({
  userAddress: {
    type: String,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  deletion: {
    type: Boolean,
  },
  thumbsUp: {
    type: Array,
  },
  thumbsDown: {
    type: Array,
  },
  comments: {
    type: Array,
  },
  date: {
    type: Number,
  },
});

const Post = models.Post || model('Post', postSchema);
export default Post;
