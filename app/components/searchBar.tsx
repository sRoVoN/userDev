"use client";
import { useUsersQuery } from "@/hooks/useUsers";
import { User } from "@/types/userType";
import { useState } from "react";
import { useRouter } from "next/navigation";


interface searchBarProp {
 handleFocus: () => void,
 handleBlur: () => void
}

export default function SearchBar({handleBlur, handleFocus}: searchBarProp) {
  const [search, setSearch] = useState("");
  const { data: users = [] } = useUsersQuery();
  const router = useRouter();
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search by name or username..."
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border rounded text-pink-600 outline-none dark:text-rose-300"
      />
      {search.length > 0 ? (
        <ul className="space-y-2">
          {
            filteredUsers.map((filter) => (
              <li
              key={filter.id}
              onClick={() => router.push(`/users/${filter.id}`)}
              className="text-pink-400 cursor-pointer hover:text-gray-500 mt-2"
              >
                {filter.name}
                {filter.username}
              </li>
            ))
          }
        </ul>
      ) : null}
    </div>
  );
}
