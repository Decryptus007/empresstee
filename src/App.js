/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { falseAuth, setUserData, trueAuth } from "./features/authSlice";
import { Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

import Home from "./components/main/home/Home";
import { Login } from "./components/Auth/Login";
import { Signup } from "./components/Auth/Signup";
import About from "./components/About";
import Landing from "./components/Landing";
import Loading from "./components/Aux/Loading";

import "./App.css";
import "animate.css";

import { app } from "./firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { notLoading } from "./features/loadingSlice";
import SavedItems from "./components/main/SavedItem";
import NullPage from "./components/Aux/Nullpage";
import CustomerChoiceFull from "./components/main/CustomerChoiceFull";
import CakeCategory from "./components/main/CakeCategory";
import FoodCategory from "./components/main/FoodCategory";
import OtherCakes from "./components/main/OtherCakes";

library.add(fab, fas, far);

function App() {
  const auth = getAuth();
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.authState.value.auth);
  const showLoading = useSelector((state) => state.loadingState.value);

  const [paths, setPaths] = useState(<Loading />);

  const switchRoute = () => {
    switch (authState) {
      case true:
        setPaths(
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="customer-choice" element={<CustomerChoiceFull />} />
            <Route path="cake-category" element={<CakeCategory />} />
            <Route path="food-category" element={<FoodCategory />} />
            <Route path="other-cakes-category" element={<OtherCakes />} />
            <Route path="about" element={<About />} />
            <Route path="saved-items" element={<SavedItems />} />
            <Route path="*" element={<NullPage />} />
          </Routes>
        );
        break;
      case false:
        setPaths(
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="*" element={<NullPage />} />
          </Routes>
        );
        break;

      default:
        setPaths(paths);
        break;
    }
  };

  // useEffect(() => dispatch(notLoading()));

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(trueAuth());
      switchRoute();
      dispatch(setUserData(user));
    } else {
      dispatch(falseAuth());
      switchRoute();
      dispatch(setUserData(""));
    }
  });
  // Not using showLoading for now, will come back for it
  return (
    <>
      {showLoading && <Loading />}
      {paths}
    </>
  );
}

export default App;
