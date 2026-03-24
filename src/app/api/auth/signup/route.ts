export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { User } from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user", // Default role
    });

    return NextResponse.json(
      { message: "User created successfully", user: { id: newUser._id, email: newUser.email, name: newUser.name } },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
