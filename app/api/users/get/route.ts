import { NextRequest, NextResponse } from 'next/server';
import { connect } from '#/app/dbconfig/dbconfig';
import User from '#/app/models/userModel';

connect();

export const GET = async (req: { url: string | URL }) => {
  const { searchParams } = new URL(req.url);
  const param = searchParams.get('timePeriod');
  console.log(param);
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

    const allUsers = await User.find({
      date: { $gte: startDate },
    }).sort({ date: -1 });

    const activeUsers = await User.find({
      date: { $gte: startDate },
    }).sort({ date: -1 });

    return NextResponse.json({
      message: 'Get Users Successfully!',
      success: true,
      allUsers,
      activeUsers,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
