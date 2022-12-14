import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Aux/Navbar";
import Loading from "../Aux/Loading";
import loadingImg from "../../assets/loader.gif";
import { getDownloadURL, getStorage, list, ref } from "firebase/storage";
import { database } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { betterViewStore, loadingCakes } from "../../features/betterViewSlice";
import { showRoom } from "../../features/showRoomSlice";
import CakeShowRoom from "./CakeShowRoom";

export default function CustomerChoiceFull() {
  const collectionRef = collection(database, "image-db");

  const showRoomState = useSelector((state) => state.showRoomState.value);
  const dispatch = useDispatch();

  const [sideBarState, setSideBarState] = useState("hidden");
  const [sideBarCtrl, setSideBarCtrl] = useState("bars");
  const [img, setImg] = useState([]);
  const [loadInit, setLoadInit] = useState([]);
  const [betterView, setBetterView] = useState([]);
  const [num, setNum] = useState();

  useEffect(() => {
    async function pageTokenExample() {
      // Create a reference under which you want to list
      const storage = getStorage();
      const listRef = ref(storage, "/customer-choice");

      // Fetch the first page of 100.
      const firstPage = await list(listRef, { maxResults: 10 });
      firstPage.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
          if (img.indexOf(url) === -1) {
            setImg((prevImg) => [...prevImg, url]);
          }
        });
      });
      if (img.length === 10) {
        setLoadInit(img);
      }
    }
    pageTokenExample();
  }, [img]);

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

  function getData() {
    getDocs(collectionRef).then((res) => {
      res.docs.map((item) => {
        let data = item.data();
        return setBetterView((prev) => [...prev, data]);
      });
    }).catch(() => alert('Slow Network Detected ????'))
  }

  useEffect(() => {
    const inte = setInterval(() => {
      if (betterView.length === 0) {
        return null;
      } else if (betterView.length !== 0) {
        dispatch(betterViewStore(betterView[num]));
        dispatch(loadingCakes(false));
      }
    }, 1000);
    return () => clearInterval(inte);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [betterView]);

  const showMore = (src) => {
    setBetterView([]);
    dispatch(loadingCakes(true));
    let split1 = src.slice(0, -57);
    let split2 = split1.slice(95, split1.length);
    setNum(split2 - 1);
    getData(num);
    dispatch(showRoom());
  };

  return (
    <>
      {loadInit.length === 0 && <Loading />}
      {showRoomState && <CakeShowRoom />}
      <main className="relative container mx-auto bg-white pb-4">
        <Navbar
          home={true}
          toggleSideBar={toggleSideBar}
          sideBarCtrl={sideBarCtrl}
          sideBarState={sideBarState}
        />
        <h2 className="mt-2 mb-8 py-2 text-2xl text-center font-bold bg-pink-500 text-white">
          <FontAwesomeIcon
            icon={`fa-solid fa-star`}
            className="mx-0.5 border-2 border-white rounded-full text-sm"
          />
          Customer's Choice
        </h2>
        <div className="p-1 flex flex-wrap items-center justify-evenly gap-y-4 xl:gap-x-4">
          {loadInit ? (
            loadInit.map((item, id) => (
              <div
                key={id}
                className="border-2 border-pink-500 rounded-lg h-40 w-40 md:h-44 md:w-44"
              >
                <img
                  src={item}
                  alt="cake"
                  loading="lazy"
                  className="rounded-lg object-cover w-full h-full"
                  onClick={(e) => showMore(e.target.src)}
                />
              </div>
            ))
          ) : (
            <div className="rounded-lg h-40 w-40 md:h-44 md:w-44">
              <img
                src={loadingImg}
                alt="cake"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
