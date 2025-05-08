// app/api/users/[id]/route.ts
import { User } from "@/types/userType";
import { NextRequest, NextResponse } from "next/server";


let customUsers: User[] = [];

export async function GET(request: NextRequest, context: any) {
  const { id } = context.params;

  const isFakeUser = !isNaN(Number(id));

  if (isFakeUser) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!res.ok) return NextResponse.json({ message: "User not found" }, { status: 404 });
    const data = await res.json();
    return NextResponse.json({ data });
  }

  const user = customUsers.find((u) => u.id === id);
  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

  return NextResponse.json({ data: user });
}

export async function DELETE(request: NextRequest, context: any) {
  const { id } = context.params;

  const isFakeUser = !isNaN(Number(id));
  if (isFakeUser) {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, { method: "DELETE" });
    return NextResponse.json({ message: "Fake user deleted" });
  }

  customUsers = customUsers.filter((u) => u.id !== id);
  return NextResponse.json({ message: "Custom user deleted" });
}

export async function PUT(request: NextRequest, context: any) {
  const { id } = context.params;
  const updated = await request.json();

  const isFakeUser = !isNaN(Number(id));
  if (isFakeUser) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(updated),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    return NextResponse.json({ message: "Fake user updated", data });
  }

  const index = customUsers.findIndex((u) => u.id === id);
  if (index === -1) return NextResponse.json({ message: "User not found" }, { status: 404 });

  customUsers[index] = { ...customUsers[index], ...updated };
  return NextResponse.json({ message: "User updated", data: customUsers[index] });
}
