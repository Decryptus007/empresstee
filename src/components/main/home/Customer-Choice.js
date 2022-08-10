import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getStorage, ref, getDownloadURL, list } from "firebase/storage";
import { database } from "../../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

import cake from "../../../assets/loadingImg.webp";
import { useDispatch } from "react-redux";
import { showRoom } from "../../../features/showRoomSlice";
import {
  betterViewStore,
  loadingCakes,
} from "../../../features/betterViewSlice";

export default function CustomerChoice() {
  const collectionRef = collection(database, "image-db");

  const [img, setImg] = useState([]);
  const [loadInit, setLoadInit] = useState([]);
  const [betterView, setBetterView] = useState([]);
  const [num, setNum] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    async function pageTokenExample() {
      // Create a reference under which you want to list
      const storage = getStorage();
      const listRef = ref(storage, "/customer-choice");

      // Fetch the first page of 100.
      const firstPage = await list(listRef, { maxResults: 5 });
      firstPage.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
          if (img.indexOf(url) === -1) {
            setImg((prevImg) => [...prevImg, url]);
          }
        });
      });
      if (img.length === 5) {
        setLoadInit(img);
      }
    }
    pageTokenExample();
  }, [img]);

  function getData(num) {
    getDocs(collectionRef).then((res) => {
      res.docs.map((item) => {
        let data = item.data();
        setBetterView((prev) => [...prev, data]);
        return { ...betterView[num] };
      });
    });
  }

  useEffect(() => {
    let inte = setInterval(() => {
      if (betterView.length === 0) {
        return null;
      } else if (betterView.length !== 0) {
        dispatch(betterViewStore(betterView[num]));
        dispatch(loadingCakes(false));
        clearInterval(inte);
      }
    }, 1000);
  });

  const showMore = (src) => {
    dispatch(loadingCakes(true));
    let split1 = src.slice(0, -57);
    let split2 = split1.slice(95, split1.length);
    setNum(split2 - 1)
    getData(num);
    dispatch(showRoom());
  };

  return (
    <section className="">
      <div className="w-full flex items-center justify-between text-black">
        <small className="text-md">
          <FontAwesomeIcon icon={`fa-solid fa-star`} className="mx-px" />
          Customer's Choice
          <NavLink
            to={"/customer-choice"}
            className="mx-0.5 font-bold p-1 rounded-full bg-pink-500 text-white "
          >
            See All
            <FontAwesomeIcon
              icon={`fa-solid fa-angle-right`}
              className="mx-2"
            />
          </NavLink>
        </small>
        <div className="bg-pink-500 w-1/3 md:w-4/6 h-0.5"></div>
      </div>
      <div className="flex overflow-x-scroll py-4">
        <div className="flex flex-nowrap">
          {loadInit.length !== 0 ? (
            loadInit.map((url, id) => (
              <div key={id} className="inline-block px-3">
                <div className="w-52 h-52 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  <img
                    onClick={(e) => showMore(e.target.src)}
                    src={url}
                    alt="Cake Collection"
                    className="cursor-pointer object-cover w-full h-full"
                    loading="lazy"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="inline-block px-3">
              <div className="w-52 h-52 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <img
                  src={cake}
                  alt="Cake Collection"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
