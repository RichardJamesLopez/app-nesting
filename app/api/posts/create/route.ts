import { NextRequest, NextResponse } from 'next/server';
import { connect } from '#/app/dbconfig/dbconfig';
import Post from '#/app/models/postModel';

connect();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const {
      userAddress,
      title,
      content,
      thumbsUp,
      thumbsDown,
      deletion,
      comments,
      date,
    } = await reqBody;

    const newPost = new Post({
      userAddress,
      title,
      content,
      thumbsUp,
      thumbsDown,
      comments,
      deletion,
      date,
    });
    const savedPost = await newPost.save();
    const allPosts = await Post.find();

    return NextResponse.json({
      message: 'Your post crated Successfully!',
      success: true,
      savedPost,
      allPosts,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: `Error: ${error.message}`,
        success: false,
      },
      { status: 500 },
    );
  }
};
