import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../Aux/Navbar";
import CakeShowRoom from "../CakeShowRoom";
import CustomerChoice from "./Customer-Choice";
import ImageSlider from "./ImageSlider";

const Home = () => {
  const showRoom = useSelector((state) => state.showRoomState.value);

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
    <>
      {showRoom && <CakeShowRoom />}
      <main className="relative container mx-auto bg-white">
        <Navbar
          home={true}
          toggleSideBar={toggleSideBar}
          sideBarCtrl={sideBarCtrl}
          sideBarState={sideBarState}
        />
        <section className="h-52 md:h-64 lg:h-72">
          <ImageSlider />
        </section>
        <h2 className="text-center my-4 p-2 bg-pink-500 text-white font-bold">
          Cake Galore
        </h2>
        <CustomerChoice />
      </main>
    </>
  );
};

export default Home;
