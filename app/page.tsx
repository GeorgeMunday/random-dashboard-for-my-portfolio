"use client";

import { useState } from "react";

import useOnlineStatus from "@/lib/customHooks/useOnlineStatus";

import Authentification from "@/components/organisms/Authentification/Authentification";
import Header from "@/components/molecules/Header/Header";
import Information from "@/components/organisms/Information/Information";

// this is the main route of the application and it is responsible for rendering the main page of the application
// fromt his page you will be able to login and learn information about the application and its features

export default function Home() {
  const wifiConnection = useOnlineStatus();
  const [information, setInformation] = useState(false);

  if (!wifiConnection) {
    return (
      <div className="flex flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        No internet connection
      </div>
    );
  }

  if (information) {
    return (
      <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black ">
        <Header
          information={information}
          setInformation={setInformation}
        />

        <div className="flex flex-1 items-center justify-center">
         <Information />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <Header
        information={information}
        setInformation={setInformation}
      />

      <div className="flex flex-1 items-center justify-center p-8 mb-10">
        <Authentification />
      </div>
    </div>
  );
}