import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { falseAuth, trueAuth } from "./features/authSlice";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

import Home from "./components/main/Home";
import { Login, Signup } from "./components/Auth/Auth";
import About from "./components/About";
import Landing from "./components/Landing";
import Loading from "./components/Aux/Loading";

import "./App.css";

library.add(fab, fas, far);

function App() {
  const auth = getAuth();
  const dispatch = useDispatch()

  const authState = useSelector(state => state.authState.value)

  const [paths, setPaths] = useState(
    <Loading />
  );

  const switchRoute = () => {
    switch (authState) {
      case true:
        setPaths(
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
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
            </Routes>
          );
          break;

      default:
        setPaths(paths)
        break;
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(trueAuth());
        switchRoute();
      } else {
        dispatch(falseAuth());
        switchRoute();
      }
    });
  });

  return <>{paths}</>;
}

export default App;
