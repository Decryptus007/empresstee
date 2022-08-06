import React, { useState } from "react";
import Navbar from "../Aux/Navbar";
import ImageSlider from "./ImageSlider/ImageSlider";

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
      <section className="h-52 md:h-64 lg:h-72">
        <ImageSlider />
      </section>
    </main>
  );
};

export default Home;
