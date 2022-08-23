import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unsetShowRoom } from "../../features/showRoomSlice";
import Loading from "../Aux/Loading";
// eslint-disable-next-line no-unused-vars
import { app, database } from "../../firebaseConfig";
import { setDoc, doc, getDoc } from "firebase/firestore";

import "animate.css";

export default function CakeShowRoom() {
  const user = useSelector((state) => state.authState.value.userData);
  const docRef = doc(database, "users", user.uid);

  const dispatch = useDispatch();

  const [mainFrame, setMainFrame] = useState(null);
  const [btntext, setBtnText] = useState("Add to Saved Items");
  const [checkItems, setCheckItems] = useState([]);

  const betterViewProp = useSelector(
    (state) => state.betterViewProp.value.cakeProps
  );

  const storeCount = useSelector(
    (state) => state.betterViewProp.value.savedItemsProps
  );
  const loadingCakes = useSelector(
    (state) => state.betterViewProp.value.loadingProps
  );

  const [savedData, setSavedData] = useState({});

  const btnRef = useRef();

  const changeMainFrame = (url, e) => {
    // setActiveImgClass("")
    setMainFrame(url);
    // e.target.style.border = "2px solid pink"
  };

  useEffect(() => {
    Object.keys(betterViewProp).length &&
      setSavedData({
        ["savedItem" + storeCount]: {
          img: betterViewProp.img[0],
          title: betterViewProp.desc,
        },
      });
  }, [betterViewProp, storeCount]);

  useEffect(() => {
    (async function () {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let objItems = docSnap.data();
        for (const iterator in objItems) {
          if (Object.hasOwnProperty.call(objItems, iterator)) {
            const el = objItems[iterator].title;
            setCheckItems((prev) => [...prev, el]);
          }
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (checkItems.includes(betterViewProp.desc)) {
      setBtnText("Added");
      btnRef.current.disabled = true;
    } else {
      setBtnText("Add to Saved Items");
      btnRef.current.disabled = false;
    }
  }, [betterViewProp.desc, checkItems]);

  const addToSave = () => {
    setBtnText("...");
    setDoc(docRef, savedData, { merge: true }).then(() => {
      setBtnText("Added");
      btnRef.current.disabled = true;
    });
  };

  return (
    <section
      style={{ zIndex: 100 }}
      className="fixed top-0 left-0 h-screen w-full"
    >
      <div
        className="fixed top-0 left-0 h-screen w-full bg-pink-500/20"
        onClick={() => dispatch(unsetShowRoom())}
      ></div>
      <div className="animate__animated animate__zoomInDown max-w-sm mx-auto fixed bg-white text-pink-500 rounded-lg left-auto w-full h-full md:max-w-md md:h-auto md:top-2 md:left-36 lg:top-20 lg:left-1/4 xl:left-96 lg:max-w-lg">
        <div className="pt-16 w-full h-full overflow-y relative flex flex-col items-center gap-y-4">
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
                    className={`w-24 h-24 md:w-24 md:h-24 object-cover rounded-lg focus:border-2 focus:border-pink-500`}
                    onClick={(e) => {
                      changeMainFrame(e.target.src, e);
                    }}
                  />
                ))}
              </div>
            </>
          )}

          <button
            className="absolute bottom-2 left-auto p-2 rounded-lg text-center mx-auto bg-pink-500 text-white mt-8 disabled:bg-gray-500"
            onClick={() => addToSave()}
            ref={btnRef}
          >
            {btntext}
          </button>
        </div>
      </div>
    </section>
  );
}
