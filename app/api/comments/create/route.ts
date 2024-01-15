import { NextRequest, NextResponse } from 'next/server';
import { connect } from '#/app/dbconfig/dbconfig';
import Post from '#/app/models/postModel';

connect();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { id, comments } = await reqBody;

    // const deletedPost = await Post.findByIdAndDelete(id);
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $set: { comments: comments } },
      { new: true },
    );

    return NextResponse.json({
      message: 'Added Comment Successfully!',
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
