import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unsetShowRoom } from "../../features/showRoomSlice";
import Loading from "../Aux/Loading";

import "animate.css";

export default function CakeShowRoom() {
  const dispatch = useDispatch();

  const [mainFrame, setMainFrame] = useState(null);
  // const [activeImgId, setActiveImgId] = useState(0);
  // const [activeImgClass, setActiveImgClass] = useState("");

  const betterViewProp = useSelector(
    (state) => state.betterViewProp.value.cakeProps
  );
  const loadingCakes = useSelector(
    (state) => state.betterViewProp.value.loadingProps
  );

  const changeMainFrame = (url, e) => {
    // setActiveImgClass("")
    setMainFrame(url);
    // e.target.style.border = "2px solid pink"
  };

  useEffect(() => {});

  return (
    <section
      style={{ zIndex: 100 }}
      className="fixed top-0 left-0 h-screen w-full"
    >
      <div
        className="fixed top-0 left-0 h-screen w-full bg-pink-500/20"
        onClick={() => dispatch(unsetShowRoom())}
      ></div>
      <div className="animate__animated animate__zoomInDown max-w-sm mx-auto fixed bg-white text-pink-500 rounded-lg w-full h-full md:max-w-md md:h-5/6 md:top-10 md:left-36 lg:top-20 lg:left-1/4 xl:left-96 lg:max-w-lg lg:h-3/4">
        <div className="pt-16 w-full h-full relative flex flex-col items-center gap-y-4">
          <FontAwesomeIcon
            style={{ zIndex: 101 }}
            onClick={() => dispatch(unsetShowRoom())}
            icon={`fa-solid fa-close`}
            className="cursor-pointer text-3xl text-black font-bold absolute top-4 right-4"
          />
          {loadingCakes ? (
            <Loading />
          ) : (
            <>
              <p className="text-xl font-bold">{betterViewProp.desc}</p>
              <img
                src={mainFrame || betterViewProp.img[0]}
                alt="cake"
                className="object-cover rounded-lg w-64 h-64"
              />
              <div className="py-2 flex flex-wrap px-2 gap-4 items-center">
                {betterViewProp.img.map((item, id) => (
                  <img
                    tabIndex={0}
                    key={id}
                    src={item}
                    alt="cake"
                    className={`w-24 h-24 md:w-28 md:h-28 object-cover rounded-lg focus:border-2 focus:border-pink-500`}
                    onClick={(e) => {
                      changeMainFrame(e.target.src, e);
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
