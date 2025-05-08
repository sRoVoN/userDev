// utils/localStorageUsers.ts
import { User } from "@/types/userType";

const STORAGE_KEY = "users";

export function saveUsersToLocalStorage(users: User[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ data: users }));
  }
}

export function getUsersFromLocalStorage(): User[] | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed?.data)) {
      return parsed.data;
    }

    return null;
  } catch (err) {
    console.error("Failed to parse local users:", err);
    return null;
  }
}
