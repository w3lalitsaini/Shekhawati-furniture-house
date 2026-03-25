export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { User } from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, otp, password } = await req.json();

    if (!email || !otp || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email }).select("+password resetPasswordOTP resetPasswordOTPExpires");

    if (!user) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Verify OTP
    if (!user.resetPasswordOTP || user.resetPasswordOTP !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // Check expiry
    if (user.resetPasswordOTPExpires && new Date() > user.resetPasswordOTPExpires) {
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user
    user.password = hashedPassword;
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpires = undefined;
    await user.save();

    return NextResponse.json({ message: "Password reset successfully" });
  } catch (error: any) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
