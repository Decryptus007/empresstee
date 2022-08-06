import React, { useState } from "react";
import Navbar from "../Aux/Navbar";

export default function SavedItems() {
  const [sideBarState, setSideBarState] = useState("hidden");
  const [sideBarCtrl, setSideBarCtrl] = useState("bars");

  const toggleSideBar = () => {
    switch (sideBarState) {
      case "hidden":
        setSideBarState("flex");
        setSideBarCtrl("close");
        break;

      default:
        setSideBarState("hidden");
        setSideBarCtrl("bars");
        break;
    }
  };

  return (
    <main className="relative container mx-auto bg-white">
      <Navbar
        toggleSideBar={toggleSideBar}
        sideBarCtrl={sideBarCtrl}
        sideBarState={sideBarState}
      />
      <h2 className="text-2xl text-center">Saved Items</h2>
    </main>
  );
}
