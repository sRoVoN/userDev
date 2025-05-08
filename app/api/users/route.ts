// app/api/users/route.ts
import { User } from "@/types/userType";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";


let customUsers: User[] = [];

export async function GET() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error("Failed to fetch users");

    const demoUsers = await res.json() as User[];

    return NextResponse.json({ data: [...customUsers, ...demoUsers] });
  } catch (err) {
    console.error("Error fetching users:", err);
    return NextResponse.json({ message: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const newUser: User = {
    ...body,
    id: uuidv4(), // generate unique id
  };

  customUsers.push(newUser);

  return NextResponse.json({ message: "User created", data: newUser }, { status: 201 });
}
