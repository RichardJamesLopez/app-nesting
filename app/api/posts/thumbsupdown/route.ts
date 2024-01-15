import { NextRequest, NextResponse } from 'next/server';
import { connect } from '#/app/dbconfig/dbconfig';
import Post from '#/app/models/postModel';

connect();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { postId, action, userAddress } = reqBody;
    const existingPost = await Post.findById(postId);
    let thumbsUp = existingPost.thumbsUp || [];
    let thumbsDown = existingPost.thumbsDown || [];

    const thumbsUpIndex = thumbsUp.indexOf(userAddress);
    const thumbsDownIndex = thumbsDown.indexOf(userAddress);

    if (action === 'thumbsUp') {
      if (thumbsUpIndex === -1) {
        thumbsUp.push(userAddress);
      } else {
        thumbsUp.splice(thumbsUpIndex, 1);
      }
      if (thumbsDownIndex !== -1) {
        thumbsDown.splice(thumbsDownIndex, 1);
      }
    } else if (action === 'thumbsDown') {
      if (thumbsDownIndex === -1) {
        thumbsDown.push(userAddress);
      } else {
        thumbsDown.splice(thumbsDownIndex, 1);
      }

      if (thumbsUpIndex !== -1) {
        thumbsUp.splice(thumbsUpIndex, 1);
      }
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $set: {
          thumbsUp,
          thumbsDown,
        },
      },
      { new: true },
    );

    return NextResponse.json({
      message: 'Thumb Action Successfully!',
      success: true,
      updatedPost,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
