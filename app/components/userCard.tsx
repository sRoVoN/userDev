"use client"
import { User } from "@/types/userType";
import Link from "next/link";
import { useEffect } from "react";

type userCardProp = {
  user: User
}

export default function UserCard({user}: userCardProp) {
useEffect(()=> {
  console.log(user, "user")
},[])
    return (
      <div className="bg-white dark:bg-rose-800 mx-5 shadow-lg rounded-2xl p-4 flex flex-col gap-2 w-full max-w-xs transition hover:shadow-2xl">
        <Link href={`/users/${user.id}`}>
        <h2 className="text-2xl font-bold text-teal-400 hover:text-teal-300">{user.name}</h2>
        </Link>
        <p className="text-gray-600 dark:text-pink-400 text-sm">@{user.username}</p>
      </div>
    );
  }