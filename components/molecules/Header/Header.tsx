"use client";

import React from "react";
import { FaInfoCircle, FaTimes, } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

import type { HeaderProps } from "@/types/header-props";

const Header = ({ information, setInformation }: HeaderProps) => {

  const titles = [
    "Some Random Dashboard For My Portfolio",
    "Some Dumb Dashboard For My Portfolio",
    "Some Silly Dashboard For My Portfolio",
  ];

  return (
    <header className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between w-full">
      <MdDashboard className="text-3xl cursor-pointer" />
      <div className="flex-1 text-center">
        <h1 className="text-2xl font-bold">{titles[0]}</h1>
      </div>
      {information ? (
        <FaTimes
          className="text-3xl cursor-pointer"
          onClick={() => setInformation(false)}
        />
      ) : (
        <FaInfoCircle
          className="text-3xl cursor-pointer"
          onClick={() => setInformation(true)}
        />
      )}
    </header>
  );
};

export default Header;