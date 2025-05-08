// app/users/page.tsx
import { fetchUsersFromLocalStorage } from "@/hooks/useUsers";
import { getQueryClient } from "../get-query-client";
import QueryProviderSsr from "../providers/queryProviderSsr";
import { dehydrate } from "@tanstack/react-query";
import UserList from "../components/usersList";


export default async function UsersPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: fetchUsersFromLocalStorage, // ✅ now this works!
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <QueryProviderSsr dehydratedState={dehydratedState}>
      <div className="min-h-screen bg-rose-100 dark:bg-teal-950 flex flex-col items-center px-4 py-6 space-y-6">
          <UserList />
      </div>
    </QueryProviderSsr>
  );
}
