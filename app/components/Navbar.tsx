"use client";

import Link from "next/link";

import { useTheme } from "next-themes";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-orange-500 dark:bg-gray-800 text-white">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="font-bold text-xl hover:underline">
          <Link href="/">Hacker News V2</Link>
        </h1>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full hover:bg-orange-600 dark:hover:bg-gray-700">
          {theme === "dark" ? (
            <IoSunnyOutline className="w-5 h-5" />
          ) : (
            <IoMoonOutline className="w-5 h-5" />
          )}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
