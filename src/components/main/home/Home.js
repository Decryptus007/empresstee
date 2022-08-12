import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../Aux/Navbar";
import CakeShowRoom from "../CakeShowRoom";
import Category from "./Category";
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
      <main className="relative container mx-auto bg-white pb-8">
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
        <Category />
        <footer
          id="career-switch"
          className="fixed bottom-0 left-0 w-full h-16 bg-pink-500 text-white font-bold rounded-t-2xl flex items-center justify-around"
        >
          <small className="p-2 rounded-lg bg-white/50 text-pink-500 text-lg">
            Cakes
          </small>
          <small
            className="p-2 rounded-lg bg-white text-pink-500 text-lg"
            onClick={() => alert("Still in Beta...")}
          >
            Events
          </small>
        </footer>
      </main>
    </>
  );
};

export default Home;
