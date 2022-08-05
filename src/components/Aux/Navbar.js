import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { falseAuth } from "../../features/authSlice";
import Popup from "./Popup";

export default function Navbar(props) {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state) => state.authState.value);

  const [authMssg, setAuthMssg] = useState();
  const [popUp, setPopUp] = useState("hidden");

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        console.log("SignOut success");
        navigate("/");
        window.location.reload(false);
        dispatch(falseAuth());
      })
      .catch((err) => {
        setAuthMssg(err.message);
        setPopUp("block");
      });
  };

  const togglePopUp = () => {
    switch (popUp) {
      case "hidden":
        setPopUp("block");
        break;

      default:
        setPopUp("hidden");
        break;
    }
  };

  return (
    <>
      <Popup popUp={popUp} togglePopUp={togglePopUp} authMssg={authMssg} />
      <nav
        className={`mx-auto p-4 sticky top-0 left-0 text-white ${
          authState ? "bg-pink-500" : "bg-slate-800"
        } w-full flex items-center justify-between`}
      >
        <span
          className="z-30 cursor-pointer md:hidden"
          onClick={() => props.toggleSideBar()}
        >
          <FontAwesomeIcon
            icon={`fa-solid fa-${props.sideBarCtrl}`}
            className="text-2xl"
          />
        </span>
        <span id="logoTxt" className="text-2xl font-bold">
          Empress Tee
        </span>
        <NavLink to={authState ? "/about" : "/login"}>
          <span className=" md:hidden">
            <FontAwesomeIcon
              icon={`fa-solid fa-${authState ? "heart" : "user"}`}
              className="text-xl"
            />
          </span>
        </NavLink>
        <div
          className={`animate__animated animate__zoomInLeft w-full h-screen z-20 ${
            authState ? "bg-pink-500" : "bg-slate-800"
          } fixed top-0 left-0 ${
            props.sideBarState
          } flex-col items-center gap-y-12 pt-24 md:pt-0 md:gap-y-0 md:justify-end md:h-auto md:relative md:bg-transparent md:gap-x-4 md:w-2/3 md:flex-row md:flex`}
        >
          <NavLink
            to="/about"
            className={`${props.about && "font-bold"} hover:text-gray-500`}
          >
            About Baker
          </NavLink>
          <NavLink
            to="/about"
            className={`${props.about && "font-bold"} hover:text-gray-500`}
          >
            Our Service
          </NavLink>
          <NavLink
            to="/"
            className={`${props.home && "font-bold"} hover:text-gray-500`}
          >
            {authState ? "Home" : "Cake Product"}
          </NavLink>
          <button
            className="p-2 text-pink-500 rounded-lg bg-white hover:text-pink-500 hover:bg-transparent"
            onClick={() => (authState ? signOutUser() : navigate("/login"))}
          >
            <FontAwesomeIcon icon="fa-solid fa-user" className="mx-2" />
            {authState ? "Log Out" : "Account"}
          </button>
        </div>
      </nav>
    </>
  );
}
