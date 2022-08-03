import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { app } from "../../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export const Login = () => {
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
        console.log(userData.user);
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
      {showLoading && (
        <div
          className={`fixed top-0 left-0 h-screen w-full bg-slate-500/50 pt-44`}
        >
          <div className="loader">Loading...</div>
        </div>
      )}
      <div
        className={`${popUp} fixed top-0 left-0 h-screen w-full bg-slate-500/50`}
        onClick={() => togglePopUp()}
      ></div>
      <div
        className={`${popUp} animate__animated animate__fadeInUp p-2 fixed flex items-center justify-center top-1/12 left-1/12 w-10/12 h-32 rounded-lg w-full bg-pink-500 text-white`}
      >
        <p className="font-bold text-sm">{authMssg}</p>
      </div>
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

// Signup page
export const Signup = () => {
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
        setShowLoading(false);
      })
      .catch((err) => {
        setShowLoading(false);
        setAuthMssg(err.message);
        setPopUp("block");
      });
  };

  const signUpUser = () => {
    setShowLoading(true);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userData) => {
        console.log(userData.user);
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
    <section className="relative mx-auto container flex items-center justify-center w-full h-screen bg-white text-slate-900">
      {showLoading && (
        <div
          className={`fixed top-0 left-0 h-screen w-full bg-slate-500/50 pt-44`}
        >
          <div className="loader">Loading...</div>
        </div>
      )}
      <div
        className={`${popUp} fixed top-0 left-0 h-screen w-full bg-slate-500/50`}
        onClick={() => togglePopUp()}
      ></div>
      <div
        className={`${popUp} animate__animated animate__fadeInUp p-2 fixed flex items-center justify-center top-1/12 left-1/12 w-10/12 h-32 rounded-lg w-full bg-pink-500 text-white`}
      >
        <p className="font-bold text-sm">{authMssg}</p>
      </div>
      <form
        className="px-6 py-10 w-full flex flex-col items-center gap-y-4 h-full md:px-2 md:w-4/6 lg:px-20 lg:w-1/2"
        onSubmit={(e) => e.preventDefault()}
      >
        <FontAwesomeIcon
          icon={`fa-solid fa-bolt`}
          className="self-start text-4xl text-pink-500"
        />
        <h2 className="self-start text-2xl mt-4">Sign Up</h2>
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
          Sign up with Google
        </button>
        <div className="flex items-center justify-between my-2 w-full">
          <hr className="text-slate-300 bg-slate-300 w-3/12" />
          <small className="text-slate-300">or Sign up with Email</small>
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
          onClick={() => signUpUser()}
        >
          Sign Up
        </button>
        <p className="self-start font-semibold text-sm">
          Already have an account?{" "}
          <NavLink to="/login" className={"text-pink-500"}>
            Sign In
          </NavLink>
        </p>
      </form>
      <div id="loginBg" className="hidden w-1/2 h-full lg:block"></div>
    </section>
  );
};
