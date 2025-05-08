"use client";
// app/users/[id]/page.tsx

import { useParams, useRouter } from "next/navigation";
import { useSingleUserQuery } from "@/hooks/useSingleUser";
import DetailUserCard from "@/app/components/detailUserCard";
import { useDeleteUser } from "@/hooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import { use } from "react";

interface userDetailPageProp {
  params: Promise<{ id: string }>;
}
export default function UserDetailPage({ params }: userDetailPageProp) {
  const { id } = use(params);

  const userId = parseInt(id as string); // safely cast
  const queryClient = useQueryClient();
  const { data: user, isLoading, error } = useSingleUserQuery(userId);
  console.log(user, "userrr", queryClient.getQueryData(["user", userId]));

  const deleteUserMutation = useDeleteUser();
  const router = useRouter();

  const handleDelete = (id: number) => {
    deleteUserMutation.mutate(id, {
      onSuccess: () => router.push("/users"),
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong.</div>;
  if (!user) return <div>No user found.</div>;

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center bg-rose-300 p-6 dark:bg-teal-950">
      <DetailUserCard user={user} handleDelete={handleDelete} />
    </div>
  );
}
