"use client"
import { User } from "@/types/userType";
import { useMutation, useQueryClient } from "@tanstack/react-query";


// CREATE a user
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newUser: Omit<User, "id">) => {
      const stored = localStorage.getItem("users");
      const current: User[] = stored ? JSON.parse(stored) : [];

      // Find max numeric ID
      const maxId = current.reduce((max, user) => {
        const id = typeof user.id === "number" ? user.id : parseInt(user.id as any, 10) || 0;
        return Math.max(max, id);
      }, 0);

      const userWithId: User = {
        ...newUser,
        id: maxId + 1,
      };

      const updated = [...current, userWithId];
      localStorage.setItem("users", JSON.stringify(updated));

      return userWithId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  });
};


// export function useCreateUser() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (user: { name: string; email: string }) => {
//       const res = await fetch("/api/users", {
//         method: "POST",
//         body: JSON.stringify(user),
//         headers: { "Content-Type": "application/json" },
//       });
//       const data = await res.json();
//       return data.data as User;
//     },
//     onSuccess: (newUser) => {
//       const existing = JSON.parse(localStorage.getItem("users") || "[]");
//       const updated = [newUser, ...existing];
//       localStorage.setItem("users", JSON.stringify(updated));

//       queryClient.setQueryData(["users"], (old: any) => {
//         if (!old || !Array.isArray(old.data)) return { data: [newUser] };
//         return { ...old, data: [newUser, ...old.data] };
//       });
//     },
//   });
// }


// DELETE a user by ID

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string | number) => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const remaining = users.filter((u: User) => String(u.id) !== String(id));
      localStorage.setItem("users", JSON.stringify(remaining));

      const deletedIds = JSON.parse(localStorage.getItem("deletedUserIds") || "[]");
      localStorage.setItem("deletedUserIds", JSON.stringify([...deletedIds, String(id)]));
      return id;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });
};




// export function useDeleteUser() {
//   const queryClient = useQueryClient();
//   const router = useRouter();

//   return useMutation({
//     mutationFn: async (id: number) => {
//       const endpoint = isNaN(Number(id))
//         ? `/api/users/${id}`
//         : `https://jsonplaceholder.typicode.com/users/${id}`;

//       const res = await fetch(endpoint, {
//         method: "DELETE",
//       });

//       if (!res.ok) {
//         throw new Error("Failed to delete user");
//       }

//       return id;
//     },
//     onSuccess: (deletedUserId) => {
//       // Invalidate the query for the deleted user to refetch fresh data
//       queryClient.invalidateQueries({ queryKey: ["user", deletedUserId] });

//       // Invalidate the users list query if needed
//       queryClient.invalidateQueries({ queryKey: ["users"] });

//       // Redirect to users list after deletion
//       router.push("/users");
//     },
//   });
// }

// UPDATE a user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedUser: User) => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const newUsers = users.map((u: User) =>
        String(u.id) === String(updatedUser.id) ? updatedUser : u
      );
      localStorage.setItem("users", JSON.stringify(newUsers));
      return updatedUser;
    },
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", updatedUser.id] });
    },
  });
};



// export function useUpdateUser() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (user: User) => {
//       const endpoint = isNaN(Number(user.id))
//         ? `/api/users/${user.id}`
//         : `https://jsonplaceholder.typicode.com/users/${user.id}`;

//       const res = await fetch(endpoint, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(user),
//       });

//       if (!res.ok) {
//         const error = await res.json();
//         throw new Error(error.message || "Failed to update user");
//       }

//       const data = await res.json();
//       return { ...data, id: String(data.id) };
//     },
//     onSuccess: (formData: User) => {
//       // Invalidate the specific user query after updating
//       queryClient.invalidateQueries({ queryKey: ["user", formData.id] });

//       // Invalidate the users list query to ensure the list is updated as well
//       queryClient.invalidateQueries({ queryKey: ["users"] });

//       // Optionally, you could navigate to the user detail page after updating
//     },
//   });
// }
