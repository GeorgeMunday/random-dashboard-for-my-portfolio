import React from "react";
import { FaInfoCircle, FaTimes } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

type InformationProps = {
  information: boolean;
  setInformation: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ information, setInformation }: InformationProps) => {
  return (
    <header className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between w-full">
      <MdDashboard className="text-3xl cursor-pointer" />

      <h1 className="text-2xl font-bold">Some Random Dashboard For My Portfolio</h1>

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