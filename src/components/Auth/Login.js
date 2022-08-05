import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";
import Loading from "../Aux/Loading";
// eslint-disable-next-line no-unused-vars
import { app } from "../../firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Popup from "../Aux/Popup";

export const Login = () => {
  const navigate = useNavigate();

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const [data, setData] = useState({});
  const [authMssg, setAuthMssg] = useState();
  const [popUp, setPopUp] = useState("hidden");
  const [showLoading, setShowLoading] = useState(false);

  const handleInput = (e) => {
    let newInput = { [e.target.name]: e.target.value };
    setData({ ...data, ...newInput });
  };

  const googleSignIn = () => {
    setShowLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((userData) => {
        console.log(userData.user);
        navigate("/");
        setShowLoading(false);
      })
      .catch((err) => {
        setShowLoading(false);
        setAuthMssg(err.message);
        setPopUp("block");
      });
  };

  const signInUser = () => {
    setShowLoading(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userData) => {
        console.log(userData.user.email);
        navigate("/");
        setShowLoading(false);
      })
      .catch((err) => {
        setShowLoading(false);
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
    <section className="mx-auto container flex items-center justify-center w-full h-screen bg-white text-slate-900">
      {showLoading && <Loading />}
      <Popup popUp={popUp} togglePopUp={togglePopUp} authMssg={authMssg} />
      <form
        className="px-6 py-10 w-full flex flex-col items-center gap-y-4 h-full md:px-2 md:w-4/6 lg:px-20 lg:w-1/2"
        onSubmit={(e) => e.preventDefault()}
      >
        <FontAwesomeIcon
          icon={`fa-solid fa-bolt`}
          className="self-start text-4xl text-pink-500"
        />
        <h2 className="self-start text-2xl mt-4">Login</h2>
        <small className="self-start text-slate-500 text-md">
          All modern cakes at your reach.
        </small>
        <button
          className="w-full py-2 border-2 border-slate-300 rounded-full hover:bg-pink-200 hover:border-0 hover:text-white"
          onClick={() => googleSignIn()}
        >
          <FontAwesomeIcon
            icon={`fa-brands fa-google`}
            className="mx-4 text-md text-red-500"
          />
          Sign in with Google
        </button>
        <div className="flex items-center justify-between my-2 w-full">
          <hr className="text-slate-300 bg-slate-300 w-3/12" />
          <small className="text-slate-300">or Sign in with Email</small>
          <hr className="text-slate-300 bg-slate-300 w-3/12" />
        </div>
        <div className="flex flex-col w-full">
          <span className="my-2 font-semibold">Email*</span>
          <input
            className="p-2 border-2 border-slate-300 rounded-full"
            type={"email"}
            name="email"
            placeholder="mail@website.com"
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div className="flex flex-col w-full">
          <span className="my-2 font-semibold">Password*</span>
          <input
            className="p-2 border-2 border-slate-300 rounded-full"
            type={"password"}
            name="password"
            placeholder="password"
            onChange={(e) => handleInput(e)}
          />
        </div>
        <button
          className="w-full bg-pink-500 py-2 mt-6 rounded-full hover:bg-pink-200 text-white"
          onClick={() => signInUser()}
        >
          Login
        </button>
        <p className="self-start font-semibold text-sm">
          Not registered yet?{" "}
          <NavLink to="/signup" className={"text-pink-500"}>
            Create an account
          </NavLink>
        </p>
      </form>
      <div id="loginBg" className="hidden w-1/2 h-full lg:block"></div>
    </section>
  );
};

