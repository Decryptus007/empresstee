import React from "react";
import { NavLink } from "react-router-dom";
import "animate.css";

import errImg from "../../assets/errImg.png";

const NullPage = () => {
  return (
    <main className="container px-8 mx-auto h-screen bg-rose-300 text-black flex flex-col items-center justify-center gap-y-8">
      <img src={errImg} alt="Not Found" className="object-cover h-40 w-40" />
      <p className="text-center text-lg">
        <span className="font-bold">Aw, snap!</span> That's not the way to the
        kitchen.
      </p>
      <p className="mt-4 text-sm text-center text-md">
        Or if you tried logging and you are redirected just wait for 2-10 seconds to automatically direct you. If not click the buton below.
      </p>
      <NavLink
        style={{ zIndex: 1 }}
        to="/"
        className="animate__animated animate__heartBeat animate__delay-2s p-2 rounded-lg bg-cyan-200 text-md text-cyan-900"
      >
        Allow me to find your way back
      </NavLink>
    </main>
  );
};

export default NullPage;
