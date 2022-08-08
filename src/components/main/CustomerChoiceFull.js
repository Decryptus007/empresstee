import React, { useEffect, useState } from "react";
import Navbar from "../Aux/Navbar";
import { getDownloadURL, getStorage, list, ref } from "firebase/storage";
import Loading from "../Aux/Loading";
import loadingImg from "../../assets/loadingImg.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CustomerChoiceFull() {
  const [sideBarState, setSideBarState] = useState("hidden");
  const [sideBarCtrl, setSideBarCtrl] = useState("bars");

  const [img, setImg] = useState([]);
  const [loadInit, setLoadInit] = useState([]);

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

  return (
    <>
      {loadInit.length === 0 && <Loading />}
      <main className="relative container mx-auto bg-white pb-4">
        <Navbar
          home={true}
          toggleSideBar={toggleSideBar}
          sideBarCtrl={sideBarCtrl}
          sideBarState={sideBarState}
        />
        <h2 className="mt-2 mb-8 py-2 text-2xl text-center font-bold bg-pink-500 text-white">
          <FontAwesomeIcon icon={`fa-solid fa-star`} className="mx-0.5 border-2 border-white rounded-full text-sm" />
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
