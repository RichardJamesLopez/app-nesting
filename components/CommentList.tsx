// components/CommentList.tsx
import { useState } from 'react';
import Comment from './Comment';

// Define a type for the comment object
interface CommentType {
    id: string;
    author: string;
    content: string;
    timestamp: Date;
    // Add other fields as needed
  }
  
  // Define a type for the props
  interface CommentListProps {
    comments: CommentType[];
  }


function CommentList({ comments }) {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    // Add a new comment to your MongoDB database
  };
  if (!comments) {
    return (
        <div>Loading Comments...</div>
        );
  }

  return (
    <div>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
      <input type="text" value={newComment} onChange={e => setNewComment(e.target.value)} />
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
}

export default CommentList;