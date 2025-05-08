// app/settings/page.tsx or wherever your settings live

import { AddUserForm } from "../components/addUserForm";


export default function SettingPage() {
  return (
    <div className="flex flex-col w-full h-screen bg-rose-300 dark:bg-teal-950 items-center justify-center p-6">
      <h1 className="text-2xl mb-4">Add a New User</h1>
      <AddUserForm />
    </div>
  );
}
