import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { unsetShowRoom } from "../../features/showRoomSlice";

import 'animate.css'

export default function CakeShowRoom() {
  const dispatch = useDispatch();

  return (
    <section
      style={{ zIndex: 100 }}
      className="fixed top-0 left-0 h-screen w-full"
    >
      <div
        className="fixed top-0 left-0 h-screen w-full bg-pink-500/20"
        onClick={() => dispatch(unsetShowRoom())}
      ></div>
      <div className="animate__animated animate__zoomInDown max-w-sm mx-auto fixed bg-white text-pink-500 rounded-lg w-full h-full md:max-w-md md:h-5/6 md:top-10 md:left-36 lg:top-20 lg:left-1/4 lg:w-1/2 lg:h-3/4">
        <div className="w-full h-full relative">
          <FontAwesomeIcon
            onClick={() => dispatch(unsetShowRoom())}
            icon={`fa-solid fa-close`}
            className="cursor-pointer text-3xl text-black font-bold absolute top-4 right-4"
          />
        </div>
      </div>
    </section>
  );
}
