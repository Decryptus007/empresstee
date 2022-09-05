import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import cakeOne from "../assets/cake-one.jpg";
import cakeTwo from "../assets/cake-two.jpeg";
import cakeThree from "../assets/cake-three.jpeg";
import Navbar from "./Aux/Navbar";

const time = new Date().getFullYear();

const Landing = () => {
  const [sideBarState, setSideBarState] = useState("hidden");
  const [hideAnime, setHideAnime] = useState("inline-block");
  const [sideBarCtrl, setSideBarCtrl] = useState("bars");

  const toggleSideBar = () => {
    switch (sideBarState) {
      case "hidden":
        setSideBarState("flex");
        setHideAnime("hidden");
        setSideBarCtrl("close");
        break;

      default:
        setSideBarState("hidden");
        setHideAnime("inline-block");
        setSideBarCtrl("bars");
        break;
    }
  };

  return (
    <main id="landing" className="container mx-auto h-auto bg-white">
      <section className="relative px-4 h-1150 bg-slate-800 text-white md:h-800 lg:px-32">
        <Navbar
          home={true}
          toggleSideBar={toggleSideBar}
          sideBarCtrl={sideBarCtrl}
          sideBarState={sideBarState}
        />
        <div className="h-full flex flex-col items-center ">
          <h1 className="hidden text-5xl pt-20 font-bold md:inline-block">
            Cooking With Heart, Until
          </h1>
          <h1 className="hidden text-5xl font-bold md:inline-block">
            it Becomes a Cake
          </h1>
          <h1 className="text-center pt-20 text-4xl font-bold md:hidden">
            Cooking With Heart, Until it Becomes a Cake
          </h1>
          <Link
            to="login"
            className={`${hideAnime} block animate__animated animate__rubberBand animate__delay-1s p-2 mt-2 bg-pink-500 hover:text-pink-500 hover:bg-transparent`}
          >
            Let's See Our Production
            <FontAwesomeIcon icon="fa-solid fa-caret-right" className="mx-2" />
          </Link>
          <div className="mt-12 p-4 flex flex-col justify-center gap-x-4 -mb-72 w-full md:flex-row">
            <div className="w-full flex flex-wrap flex-col gap-y-4 md:w-1/3 ">
              <img
                className="object-cover h-52"
                src={cakeOne}
                loading="lazy"
                alt="cake"
              />
              <img
                className="hidden object-cover h-52 md:block"
                src={cakeTwo}
                loading="lazy"
                alt="cake"
              />
            </div>
            <div className="w-full flex justify-between mt-2 gap-x-2 md:gap-x-0 md:w-1/3 md:flex-col md:justify-center md:mt-0 md:gap-y-4">
              <img
                className="w-1/2 object-cover h-52 md:w-full"
                src={cakeOne}
                loading="lazy"
                alt="cake"
              />
              <img
                className="w-1/2 h-52 object-cover md:h-40 md:w-full"
                src={cakeTwo}
                loading="lazy"
                alt="cake"
              />
            </div>
            <div className="w-full flex gap-x-2 mt-2 md:mt-0 md:gap-x-0 md:gap-y-4 md:flex-col md:w-1/3">
              <img
                className="w-1/2 h-52 object-cover md:h-64 md:w-full"
                src={cakeThree}
                loading="lazy"
                alt="cake"
              />
              <img
                className="w-1/2 h-52 object-cover md:h-40 md:w-full"
                src={cakeOne}
                loading="lazy"
                alt="cake"
              />
            </div>
          </div>
        </div>
      </section>
      <article className="mt-96 pb-10 px-4 text-center text-slate-900 md:mt-12 md:pt-72 lg:px-32">
        <h1 className="font-bold text-3xl md:text-4xl">
          You deserve delicious <span className="inline-block">c🧁ke</span> and
          we will deliver the unique experience to you
        </h1>
        <p className="mt-20 font-bold text-lg">
          <span className="py-6 border-t-2 border-pink-500">
            Oyinkansola Rita
          </span>
        </p>
        <small className="italic">
          CE0 <span className="font-bold">Empress Tee</span>
        </small>
      </article>
      <footer className="py-2 bg-slate-900 text-white text-center">
        <p>&copy;{time}</p>
      </footer>
    </main>
  );
};

export default Landing;
