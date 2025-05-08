"use client"
import { useRef } from "react";
import SearchBar from "./components/searchBar";


export default function Home(){
  const containerRef = useRef<HTMLDivElement>(null);
  const handleFocus = () => {
    if (containerRef.current) {
      containerRef.current.style.backgroundColor = "black";
    }
  };

  const handleBlur = () => {
    if (containerRef.current) {
      containerRef.current.style.backgroundColor = "#FFB6C1"; 
    }
  };
  return(
    <div className="flex flex-col justify-center items-center w-full min-h-screen bg-rose-200 dark:bg-teal-950" ref={containerRef}>
      <h1 className="text-3xl text-teal-500 dark:text-rose-300">Wellcome to UserApp</h1>
      <SearchBar handleFocus={handleFocus} handleBlur={handleBlur} />
    </div>
  )
}