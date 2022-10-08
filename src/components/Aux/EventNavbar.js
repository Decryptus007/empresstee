import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { falseAuth, setUserData } from "../../features/authSlice";
import Popup from "./Popup";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { savedItemsLength } from "../../features/betterViewSlice";

export default function EventNavbar(props) {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state) => state.authState.value.auth);

  const [authMssg, setAuthMssg] = useState();
  const [popUp, setPopUp] = useState("hidden");

  const [storeCount, setStoreCount] = useState(0);
  const user = useSelector((state) => state.authState.value.userData);

  useEffect(() => {
    const snapShot =
      user &&
      setInterval(() => {
        (async () => {
          const docRef = doc(database, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            setStoreCount(Object.keys(docSnap.data()).length);
            dispatch(savedItemsLength(storeCount));
          }
        })();
      }, 1000);

    return () => clearInterval(snapShot);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeCount, user]);

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUserData(""));
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
        style={{ zIndex: 99, background: props.eventBg }}
        className={`mx-auto p-4 sticky top-0 left-0 text-white bg-cyan-500 w-full flex items-center justify-between`}
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
        <div
          className={`animate__animated animate__zoomInLeft w-full h-screen z-20 bg-cyan-500 fixed top-0 left-0 ${props.sideBarState} flex-col items-center gap-y-12 pt-24 md:pt-0 md:gap-y-0 md:justify-end md:h-auto md:relative md:bg-transparent md:gap-x-4 md:w-2/3 md:flex-row md:flex`}
        >
          <NavLink
            to="/events"
            className={`${props.home && "font-bold"} hover:text-gray-500`}
          >
            Home
          </NavLink>
          {/*  {authState && (
            <NavLink
              to="/saved-items"
              className={`${
                props.about && "font-bold"
              } hidden relative bg-white text-pink-500 px-2 rounded-lg hover:text-gray-500 md:inline-block`}
            >
              <FontAwesomeIcon
                icon={`fa-solid fa-heart`}
                className="text-2xl"
              />
              <sup className="absolute -top-2 -right-2 py-2 px-1 rounded-lg bg-black text-pink-500">
                {storeCount}
              </sup>
            </NavLink>
            )} */}

          {/* } <NavLink
            to="/about"
            className={`${props.about && "font-bold"} hover:text-gray-500`}
          >
            About
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
            </NavLink> */}
          <button
            className="p-2 text-cyan-500 rounded-lg bg-white hover:text-cyan-600 hover:bg-transparent"
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
