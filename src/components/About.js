import React, { useState } from "react";
import Navbar from "./Aux/Navbar";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'animate.css';

const About = () => {
  const authState = useSelector((state) => state.authState.value);

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
        about={true}
        toggleSideBar={toggleSideBar}
        sideBarCtrl={sideBarCtrl}
        sideBarState={sideBarState}
      />
      <section className={`${authState ? "bg-pink-500" : "bg-slate-800"} pb-20 flex flex-col items-center justify-between md:flex-row`}>
        <div id="aboutImg" className={`rounded-b-about w-full h-600 md:w-5/12`}></div>
        <div className="md:w-7/12">
          <div className="p-2 text-center text-white">
            <h2 className="text-2xl font-bold">Empress Tee</h2>
            <p className="pt-2 text-sm">
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. Lorem ipsum may
              be used as a placeholder before final copy is available.
            </p>
          </div>
          <p className="text-xs text-white text-center my-4">Contact Me on</p>
          <div className="p-2 flex justify-center gap-x-8 w-full items-center text-white">
            <a
              href="https://instagram.com/empresstee_cakery"
              target={"_blank"}
              rel="noreferrer"
            >
              <FontAwesomeIcon
                icon={`fa-brands fa-instagram`}
                className="p-2 text-2xl text-red-700"
              />
            </a>
            <a
              href="https://twitter.com/munchies_inn"
              target={"_blank"}
              rel="noreferrer"
            >
              <FontAwesomeIcon
                icon={`fa-brands fa-twitter`}
                className="p-2 text-2xl text-sky-500"
              />
            </a>
            <a
              href="https://wa.me/+2347013242075"
              target={"_blank"}
              rel="noreferrer"
            >
              <FontAwesomeIcon
                icon={`fa-brands fa-whatsapp`}
                className="p-2 text-2xl text-green-500"
              />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
