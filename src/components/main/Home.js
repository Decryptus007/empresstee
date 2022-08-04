import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { falseAuth } from "../../features/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const Home = () => {
  const auth = getAuth();
  const dispatch = useDispatch();

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

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        dispatch(falseAuth());
        console.log("SignOut success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className="relative container mx-auto bg-white">
      <nav className="mx-auto p-4 sticky top-0 left-0 text-white bg-slate-800 w-full flex items-center justify-between">
        <span
          className="z-30 cursor-pointer md:hidden"
          onClick={() => toggleSideBar()}
        >
          <FontAwesomeIcon
            icon={`fa-solid fa-${sideBarCtrl}`}
            className="text-2xl"
          />
        </span>
        <span id="logoTxt" className="text-2xl font-bold">
          Empress Tee
        </span>
        <NavLink to="login">
          <span className=" md:hidden">
            <FontAwesomeIcon icon="fa-solid fa-user" className="text-xl" />
          </span>
        </NavLink>
        <div
          className={`animate__animated animate__zoomInLeft w-full h-screen z-20 bg-slate-800 fixed top-2 left-0 ${sideBarState} flex-col items-center gap-y-12 pt-24 md:top-0 md:pt-0 md:gap-y-0 md:justify-end md:h-auto md:relative md:bg-transparent md:gap-x-4 md:w-2/3 md:flex-row md:flex`}
        >
          <NavLink to="about" className="hover:text-gray-500">
            About Us
          </NavLink>
          <NavLink to="about" className="hover:text-gray-500">
            Our Service
          </NavLink>
          <NavLink to="/" className="font-bold hover:text-gray-500">
            Cake Product
          </NavLink>
          <button
            className="p-2 bg-pink-500 hover:text-pink-500 hover:bg-transparent"
            onClick={() => signOutUser()}
          >
            <FontAwesomeIcon icon="fa-solid fa-user" className="mx-2" />
            Log Out
          </button>
        </div>
      </nav>
      <section>
        <h1 className="pt-20 text-center font-bold text-2xl">Welcome to the Homepage</h1>
      </section>
    </main>
  );
};

export default Home;
