// components/AddUserForm.tsx
"use client";

import { useCreateUser } from "@/hooks/useMutation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { route } from "next-server/dist/server/router";


export const AddUserForm = () => {
  const { mutate, isPending } = useCreateUser();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    username: "",
    city: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      ...form,
      address: { city: form.city } as any,
    });
    setForm({ name: "", username: "", city: "", phone: "" });
    router.push("/users")
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 w-full" />
      <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="border p-2 w-full" />
      <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="border p-2 w-full" />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border p-2 w-full" />
      <button type="submit" disabled={isPending} className="bg-teal-600 text-white w-full px-4 py-2 rounded">
        {isPending ? "Adding..." : "Add User"}
      </button>
    </form>
  );
};
