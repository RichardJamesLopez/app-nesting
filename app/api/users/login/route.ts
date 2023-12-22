import { NextRequest, NextResponse } from 'next/server';
import { connect } from '#/app/dbconfig/dbconfig';
import User from '#/app/models/userModel';

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    console.log(reqBody);
    const { address } = await reqBody;

    const user = await User.findOne({ address });
    if (!user) {
      return NextResponse.json(
        {
          error: 'User does not exists!',
        },
        { status: 400 },
      );
    }
    const loggedData = {
      _id: user._id,
      address: address,
    };
    return NextResponse.json({
      message: 'User Created Successfully!',
      success: true,
      loggedData,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
