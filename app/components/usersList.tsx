"use client" 
import { useUsersQuery } from "@/hooks/useUsers";
import UserCard from "./userCard";
import { User } from "@/types/userType";


export default function UserList() {
  const { data, isLoading, isError } = useUsersQuery();
  
  console.log("🔍 data from query:", data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading users.</div>;
  }

  if (!data || !Array.isArray(data)) {
    return <div>No users available.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 p-3 ">
      {(data ?? []).map((user: User) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

