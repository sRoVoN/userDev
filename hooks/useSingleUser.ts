// hooks/useSingleUser.ts


// hooks/useSingleUser.ts
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/userType";

export const fetchSingleUser = async (id: string | number): Promise<User | null> => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const found = users.find((u: any) => String(u.id) === String(id));
  return found || null;
};

export const useSingleUserQuery = (id: string | number) =>
  useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchSingleUser(id),
    enabled: !!id,
  });




// import { useQuery } from "@tanstack/react-query";
// import { User } from "@/types/userType";


// export async function fetchSingleUser(id: string | number) {
//   if (typeof window !== "undefined") {
//     try {
//       const local = localStorage.getItem("users");
//       const users = JSON.parse(local || "[]");

//       if (Array.isArray(users)) {
//         const found = users.find((u: any) => String(u.id) === String(id));
//         if (found) return found;
//       }
//     } catch (e) {
//       console.warn("localStorage read failed", e);
//     }
//   }

//   const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
//   if (!res.ok) throw new Error("Failed to fetch user");
//   return res.json();
// }



// export const useSingleUserQuery = (id: string | number)  =>
//   useQuery<User | null>({
//     queryKey: ["user", id],
//     queryFn: () => fetchSingleUser(id),
//     enabled: !!id
//   });
  
