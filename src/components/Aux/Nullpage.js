import React from "react";
import { NavLink } from "react-router-dom";
import "animate.css";

import errImg from "../../assets/errImg.png";

const NullPage = () => {
  return (
    <main className="container px-8 mx-auto h-screen bg-gray-300 text-black flex flex-col items-center justify-center gap-y-8">
      <img src={errImg} alt="Not Found" className="object-cover h-40 w-40" />
      <p className="text-center text-lg">
        <span className="font-bold">Aw, snap!</span> That's not the way to the
        kitchen.
      </p>
      <NavLink
        style={{ zIndex: 1 }}
        to="/"
        className="animate__animated animate__lightSpeedInRight animate__delay-2s p-2 rounded-lg bg-cyan-200 underline text-md text-cyan-900"
      >
        Allow me to find your way back
      </NavLink>
    </main>
  );
};

export default NullPage;
