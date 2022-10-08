import React, { useState } from "react";

import "animate.css";
import EventNavbar from "../Aux/EventNavbar";
import { useNavigate } from "react-router-dom";

function EventHome() {
  const navigate = useNavigate();

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
    <main className="animate__animated animate__slideInRight mx-auto bg-white pb-8 min-h-[93vh] 2xl:container lg:min-h-screen">
      <EventNavbar
        home={true}
        toggleSideBar={toggleSideBar}
        sideBarCtrl={sideBarCtrl}
        sideBarState={sideBarState}
      />
      <p className="text-cyan-500 text-2xl font-semibold text-center">
        This Page is still in beta stage...
      </p>

      <footer
        id="career-switch"
        className="fixed bottom-0 left-auto w-full h-16 bg-cyan-500 text-white font-bold rounded-t-2xl flex items-center justify-around"
      >
        <button
          className="p-2 rounded-lg bg-white/50 text-cyan-500 text-lg"
          onClick={() => navigate("/")}
        >
          Cakes
        </button>
        <button className="p-2 rounded-lg bg-white text-cyan-500 text-lg">
          Events
        </button>
      </footer>
    </main>
  );
}

export default EventHome;
