import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";
import Loading from "../Aux/Loading";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Popup from "../Aux/Popup";

// Signup page
export const Signup = () => {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [authMssg, setAuthMssg] = useState();
  const [popUp, setPopUp] = useState("hidden");
  const [showLoading, setShowLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [enabledAnimation, setEnabledAnimation] = useState("");

  const btnRef = useRef();

  const handleInput = (e) => {
    let newInput = { [e.target.name]: e.target.value };
    setData({ ...data, ...newInput });
  };

  useEffect(() => {
    // eslint-disable-next-line no-useless-escape
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (Object.keys(data).length > 1) {
      if (
        fullName.length > 1 &&
        data.email.match(mailformat) &&
        data.password !== ""
      ) {
        btnRef.current.disabled = false;
        setEnabledAnimation("animate__heartBeat");
      } else {
        btnRef.current.disabled = true;
        setEnabledAnimation("");
      }
    } else {
      btnRef.current.disabled = true;
      setEnabledAnimation("");
    }
  }, [data, fullName.length]);

  const googleSignIn = () => {
    setShowLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((userData) => {
        console.log(userData.user);
        setShowLoading(false);
        navigate("/");
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
        navigate("/");
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
      {showLoading && <Loading />}
      <Popup popUp={popUp} togglePopUp={togglePopUp} authMssg={authMssg} />
      <form
        className="px-6 py-10 w-full flex flex-col items-center gap-y-4 h-auto overflow-y-auto md:px-2 md:w-4/6 lg:px-20 lg:w-1/2"
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
          <span className="my-2 font-semibold">Full Name</span>
          <input
            className="p-2 border-2 border-slate-300 rounded-full"
            type={"text"}
            name="name"
            placeholder="Empress Tee"
            onChange={(e) => setFullName(e.target.value)}
          />
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
          ref={btnRef}
          className={`animate__animated ${enabledAnimation} w-full bg-pink-500 py-2 mt-6 rounded-full hover:bg-pink-200 text-white disabled:bg-gray-600`}
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
