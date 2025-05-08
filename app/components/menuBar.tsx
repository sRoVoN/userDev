"use client"
import Link from "next/link";
import useToggleTheme from "./handleToggle";
import { WiMoonWaningCrescent5 } from "react-icons/wi";
import { IoSunnyOutline } from "react-icons/io5";

export default function MenuBar() {
  const { handleToggle, theme } = useToggleTheme();
  return (
    <div className="grid grid-cols-4 w-full sticky p-2 border h-14 z-50 bg-rose-700 md:hidden  text-gray-400">
      <Link href="/" className="hover:text-teal-300 cursor-pointer">
        Home
      </Link>
      <Link href="/users" className="hover:text-teal-300 cursor-pointer">
        Users
      </Link>
      <Link href="/setting" className="hover:text-teal-300 cursor-pointer">
        Setting
      </Link>
      {theme === "dark" ? (
        <button className="w-full flex justify-center items-center  transition rounded-lg hover:text-teal-300">
          <WiMoonWaningCrescent5 onClick={handleToggle} />
        </button>
      ) : (
        <button className="w-full flex justify-center items-center transition rounded-lg hover:text-teal-500">
          <IoSunnyOutline onClick={handleToggle} size="25px" color="#4DB6AC" />
        </button>
      )}
    </div>
  );
}
