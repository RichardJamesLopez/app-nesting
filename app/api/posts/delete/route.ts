import { NextRequest, NextResponse } from 'next/server';
import { connect } from '#/app/dbconfig/dbconfig';
import Post from '#/app/models/postModel';

connect();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { id } = await reqBody;
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $set: { deletion: true } },
      { new: true },
    );

    return NextResponse.json({
      message: 'Delete Post Successfully!',
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
