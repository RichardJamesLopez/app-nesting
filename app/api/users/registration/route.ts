import { NextRequest, NextResponse } from 'next/server';
import { connect } from '#/app/dbconfig/dbconfig';
import User from '#/app/models/userModel';

connect();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    console.log(reqBody);
    const { address } = await reqBody;

    const user = await User.findOne({ address });
    if (user) {
      return NextResponse.json({
        message: 'Logged in Successfully!',
        success: true,
        user,
      });
    }

    const newUser = new User({
      address,
    });
    const savedUser = await newUser.save();

    return NextResponse.json({
      message: 'Registered Successfully!',
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
