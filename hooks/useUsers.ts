"use client"
// hooks/useUsers.ts
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/userType";
import { useEffect, useState } from "react";

// hooks/useUsers.ts

export async function fetchUsersFromLocalStorage ( ) {
  if (typeof window === "undefined") return [];
  try {
    const local = localStorage.getItem("users");
    const deleted = localStorage.getItem("deletedUserIds");
    const parsed = local ? JSON.parse(local) : [];
    const deletedIds = deleted ? JSON.parse(deleted) : [];

    const filtered = parsed.filter(
      (user: User) => !deletedIds.includes(String(user.id))
    );

    if (filtered.length > 0) {
      return filtered;
    }

    // fallback to API
    const res = await fetch("/api/users");
    if (!res.ok) throw new Error("Failed to fetch users from API");

    const json = await res.json();
    const users: User[] = json.data || [];

    localStorage.setItem("users", JSON.stringify(users));
    return users;
  } catch (error) {
    console.error("useUsersQuery failed:", error);
    return [];
  }
};

export const useUsersQuery = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Enable the query after client mount
    setEnabled(true);
  }, []);

  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => Promise.resolve(fetchUsersFromLocalStorage()),
    enabled,
    staleTime: 1000 * 60 * 5, // optional: keeps cache fresh for 5 minutes
  });
};






// // hooks/useUsers.ts
// import {  useQuery } from "@tanstack/react-query";

// export const fetchUsers = async () => {

//   try {
//     const serverRes = await fetch("http://localhost:3000/api/users"); // or adjust this URL
//     if (!serverRes.ok) {
//       throw new Error("Failed to fetch users");
//     }

//     const serverData = await serverRes.json();
//     const serverUsers = serverData.data || [];

//     let localUsers = [];
//     let deletedUserIds = [];

//     if (typeof window !== "undefined") { // Check if we're in the browser
//       // Only use localStorage on the client side
//       localUsers = JSON.parse(localStorage.getItem("users") || "[]");
//       deletedUserIds = JSON.parse(localStorage.getItem("deletedUserIds") || "[]");
//     }

//     const filteredServerUsers = serverUsers.filter(
//       (user: any) => !deletedUserIds.includes(user.id.toString())
//     );

//     const mergedUsers = [
//       ...localUsers,
//       ...filteredServerUsers.filter(
//         (serverUser: any) =>
//           !localUsers.some((localUser: any) => localUser.id.toString() === serverUser.id.toString())
//       ),
//     ];

//     return { data: mergedUsers || [] };
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     throw new Error("Failed to fetch users");
//   }
// };



// export const useUsersQuery = () => {
//   return useQuery({
//   queryKey: ["users"],
//   queryFn: async () => {
//     const local = localStorage.getItem("users");
//     if (local) {
//       const parsed = JSON.parse(local);
//       if (Array.isArray(parsed.data)) {
//         return parsed;
//       }
//     }

//     return fetchUsers();
//   },
// });
// }

