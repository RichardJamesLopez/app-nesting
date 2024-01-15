import { NextRequest, NextResponse } from 'next/server';
import { connect } from '#/app/dbconfig/dbconfig';
import Post from '#/app/models/postModel';

connect();

export const GET = async (req: { url: string | URL }) => {
  const { searchParams } = new URL(req.url);
  const param = searchParams.get('timePeriod');
  try {
    let startDate;

    if (param === '1') {
      startDate = new Date();
      startDate.setHours(startDate.getDate() - 1);
    } else if (param === '7') {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
    } else if (param === '30') {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
    } else {
      startDate = new Date(0);
    }

    const allPosts = await Post.find({
      date: { $gte: startDate },
    }).sort({ date: -1 });

    const activePosts = await Post.find({
      deletion: false,
      date: { $gte: startDate },
    }).sort({ date: -1 });

    const deletedPosts = await Post.find({ deletion: true }).sort({
      date: -1,
    });

    return NextResponse.json({
      message: 'Get Posts Successfully!',
      success: true,
      allPosts,
      activePosts,
      deletedPosts,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
