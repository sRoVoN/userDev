"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useUsersQuery } from "@/hooks/useUsers";
import { useUpdateUser } from "@/hooks/useMutation";
import { User } from "@/types/userType";

interface EditClientProps {
  id: string;
}

export default function EditClient({ id }: EditClientProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: users, isLoading, isError } = useUsersQuery();
  const { mutate: updateUser } = useUpdateUser();
  const [formData, setFormData] = useState<User | null>(null);

  useEffect(() => {
    if (users) {
      const user = users.find((u: User) => String(u.id) === id);
      if (user) {
        setFormData(user);
      }
    }
  }, [users, id]);
 
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!formData) return;

    if (["street", "suite", "city", "zipcode"].includes(name)) {
      setFormData((prev) => ({
        ...prev!,
        address: {
          ...prev!.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev!,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    updateUser(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        router.push("/users");
      },
      onError: (err) => {
        console.error("❌ Failed to update user:", err);
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !formData) return <div>Failed to load user data.</div>;

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center bg-rose-300  p-6 dark:bg-teal-950">
      <form
        onSubmit={handleSubmit}
        className="max-w-sm w-full bg-white dark:bg-rose-900 rounded-lg shadow-xl overflow-hidden"
      >
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-800 dark:text-rose-400">
            Edit User
          </h1>

          <label className="block text-sm font-medium text-gray-700 dark:text-rose-400">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
          />

          <label className="block text-sm font-medium text-gray-700 dark:text-rose-400">Username</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
          />

          <label className="block text-sm font-medium text-gray-700 dark:text-rose-400">Phone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
          />

          <label className="block text-sm font-medium text-gray-700 dark:text-rose-400">City</label>
          <input
            name="city"
            value={formData.address?.city ?? ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition dark:bg-rose-500 dark:hover:bg-rose-400"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
