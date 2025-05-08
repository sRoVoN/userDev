"use client";

import { useRouter } from "next/navigation";
import useToggleTheme from "./handleToggle";
import { WiMoonWaningCrescent5 } from "react-icons/wi";
import { IoSunnyOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { HiOutlineUsers } from "react-icons/hi2";

export default function Sidebar() {
  const router = useRouter();
  const { handleToggle, theme } = useToggleTheme();

  return (
    <aside className="hidden md:flex w-52 h-screen bg-rose-700 text-white flex-col items-center py-6">
      <div className="flex flex-col gap-6 w-full">
        <button
          onClick={() => router.push("/")}
          className="w-full flex items-center justify-center py-3 hover:bg-rose-600 transition rounded-lg"
        >
          <GoHome size="25px" color="#333" />
          <span className="ml-2 text-teal-400 font-semibold">Home</span>
        </button>

        <button
          onClick={() => router.push("/users")}
          className="w-full flex items-center justify-center py-3 hover:bg-rose-600 transition rounded-lg"
        >
          <HiOutlineUsers size="25px" color="#333"  />
          <span className="ml-2 text-teal-400 font-semibold">Users</span>
        </button>

        <button
          onClick={() => router.push("/setting")}
          className="w-full flex items-center justify-center py-3 hover:bg-rose-600 transition rounded-lg"
        >
          <IoSettingsOutline size="25px" color="#333"  /> 
          <span className="ml-2 text-teal-400 font-semibold">Settings</span>
        </button>
        {theme === "dark" ? (
          <button className="w-full flex items-center justify-center hover:text-teal-300 py-3 hover:bg-rose-600 transition rounded-lg">
            <WiMoonWaningCrescent5  onClick={handleToggle}/>
          </button>
        ) : (
          <button className="w-full flex items-center justify-center hover:text-teal-500 py-3 hover:bg-rose-600 transition rounded-lg">
            <IoSunnyOutline onClick={handleToggle} size="25px" color="#4DB6AC" />
          </button>
        )}
      </div>

      <div className="mt-auto w-full">
        <button className="w-full flex items-center justify-center py-3 hover:bg-red-500 transition rounded-lg">
          🚪 <span className="ml-2 text-white font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
}
