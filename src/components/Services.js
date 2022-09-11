import React, { useState } from "react";
import Navbar from "./Aux/Navbar";
import { useSelector } from "react-redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "animate.css";

import cakeServices from "../assets/cake-heart-service.png";
import cupCakeServices from "../assets/cupcake-service.png";
import snacksServices from "../assets/meat-pie-service.png";
import foodServices from "../assets/food-service.png";
import eventServices from "../assets/event-decor-service.png";
import otherServices from "../assets/alternate-service.png";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const authState = useSelector((state) => state.authState.value.auth);
  const navigate = useNavigate()

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
    <main className="logo-bg relative container mx-auto bg-white">
      <Navbar
        services={true}
        toggleSideBar={toggleSideBar}
        sideBarCtrl={sideBarCtrl}
        sideBarState={sideBarState}
      />
      <section className="">
        <div className="p-2 pb-4 mt-12 md:h-[450px] flex flex-col gap-x-2 items-center justify-between md:flex-row">
          <div
            id="services-head"
            className="py-2 px-8 h-full flex flex-col gap-y-6 items-center justify-center text-center text-white md:w-1/3"
          >
            <h2 className="font-bold text-2xl">Our Services</h2>
            <p className="">
              This handy tool helps you create dummy text for all your layout
              needs. We are gradually adding new functionality and we welcome
              your suggestions and feedback.
            </p>
            <button
              className={`rounded-full py-2 px-4 font-bold border-[1px] border-white ${authState ? "bg-pink-500" : "bg-slate-800"
                }`} onClick={() => navigate("/")}
            >
              Explore Our Products
            </button>
          </div>
          <div className="mt-8 h-full flex flex-col gap-y-2 gap-x-2 items-center justify-between md:w-2/3 md:flex-row md:mt-0 md:gap-y-0">
            <div className="w-full h-full flex gap-x-2 gap-y-4 md:gap-x-0 md:flex-col md:w-1/3">
              <div className="w-1/2 p-4 bg-cyan-100 rounded-lg shadow-lg h-[200px] md:h-1/2 flex flex-col justify-center gap-y-4 md:w-full">
                <img src={cakeServices} alt="Cake" className="w-[75px] md:w-1/2" />
                <p className="text-xl font-semibold text-gray-500">Cakes</p>
                <small className="text-md">We bake cake to your taste.</small>
              </div>
              <div className="w-1/2 p-4 bg-yellow-100 rounded-lg shadow-lg h-[200px] md:h-1/2 flex flex-col justify-center gap-y-4 md:w-full">
                <img src={cupCakeServices} alt="Cake" className="w-[75px] md:w-1/2" />
                <p className="text-xl font-semibold text-gray-500">CupCake.</p>
                <small className="text-md">We bake cake to your taste.</small>
              </div>
            </div>
            <div className="w-full h-full flex gap-x-2 gap-y-4 md:gap-x-0 md:flex-col md:w-1/3">
              <div className="w-1/2 p-4 bg-rose-100 rounded-lg shadow-lg h-[200px] md:h-1/2 flex flex-col justify-center gap-y-4 md:w-full">
                <img src={snacksServices} alt="Cake" className="w-[75px] md:w-1/2" />
                <p className="text-xl font-semibold text-gray-500">Snacks</p>
                <small className="text-md">We bake cake to your taste.</small>
              </div>
              <div className="w-1/2 p-4 bg-emerald-100 rounded-lg shadow-lg h-[200px] md:h-1/2 flex flex-col justify-center gap-y-4 md:w-full">
                <img src={foodServices} alt="Cake" className="w-[75px] md:w-1/2" />
                <p className="text-xl font-semibold text-gray-500">Foods.</p>
                <small className="text-md">We bake cake to your taste.</small>
              </div>
            </div>
            <div className="w-full h-full flex gap-x-2 gap-y-4 md:gap-x-0 md:flex-col md:w-1/3">
              <div className="w-1/2 p-4 bg-blue-100 rounded-lg shadow-lg h-[200px] md:h-1/2 flex flex-col justify-center gap-y-4 md:w-full">
                <img src={eventServices} alt="Cake" className="w-[75px] md:w-1/2" />
                <p className="text-xl font-semibold text-gray-500">Events Decor</p>
                <small className="text-xs">We bring aesthetic to your occasion.</small>
              </div>
              <div className="w-1/2 p-4 bg-gray-100 rounded-lg shadow-lg h-[200px] md:h-1/2 flex flex-col justify-center gap-y-4 md:w-full">
                <img src={otherServices} alt="Cake" className="w-[75px] md:w-1/2" />
                <p className="text-xl font-semibold text-gray-500">And Many More.</p>
                <small className="text-md">We bake cake to your taste.</small>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
