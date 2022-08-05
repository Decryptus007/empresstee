import React, { useState } from "react";
import Navbar from "../Aux/Navbar";

const Home = () => {
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
        home={true}
        toggleSideBar={toggleSideBar}
        sideBarCtrl={sideBarCtrl}
        sideBarState={sideBarState}
      />
      <section>
        <h1 className="pt-20 text-center font-bold text-2xl">
          Welcome to the Homepage
        </h1>
      </section>
    </main>
  );
};

export default Home;
