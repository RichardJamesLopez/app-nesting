// components/Comment.tsx
interface CommentProps {
    comment: {
      id: string;
      author: string;
      content: string;
      timestamp: Date;
      // Add other fields as needed
    };
  }
  

function Comment({ comment }) {
    return (
      <div>
        <h4>{comment.author}</h4>
        <p>{comment.content}</p>
        <p>{comment.timestamp}</p>
        {/* Add functionality for replying, upvoting/downvoting, etc. */}
      </div>
    );
  }
  
  export default Comment;