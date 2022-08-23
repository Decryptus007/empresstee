import React, { useEffect, useState } from "react";
import Navbar from "../Aux/Navbar";
import { doc, getDoc } from "firebase/firestore";
// eslint-disable-next-line no-unused-vars
import { app, database } from "../../firebaseConfig";
import { useSelector } from "react-redux";

// import cake from "../../assets/cake-category.png";
import Loading from "../Aux/Loading";

export default function SavedItems() {
  const user = useSelector((state) => state.authState.value.userData);
  const docRef = doc(database, "users", user.uid);

  const [sideBarState, setSideBarState] = useState("hidden");
  const [sideBarCtrl, setSideBarCtrl] = useState("bars");
  const [checkItems, setCheckItems] = useState([]);

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

  useEffect(() => {
    let name = async function () {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let objItems = docSnap.data();
        for (const iterator in objItems) {
          if (Object.hasOwnProperty.call(objItems, iterator)) {
            const el = objItems[iterator];
            setCheckItems((prev) => [...prev, el]);
          }
        }
      }
    };
    name();
    return () => (name = "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="relative container mx-auto bg-white">
      <Navbar
        toggleSideBar={toggleSideBar}
        sideBarCtrl={sideBarCtrl}
        sideBarState={sideBarState}
      />
      <h2 className="text-lg text-center">Saved Items</h2>
      <div className="flex gap-y-4 flex-col items-center justify-center p-2 mt-4">
        {checkItems.length ? (
          checkItems.map((item, id) => (
            <div key={id} className="flex items-center justify-between p-2 rounded-lg bg-gray-100 mx-auto w-full h-24 md:w-96 md:h-32">
              <img
                src={item.img}
                alt="Saved Items"
                className="object-cover h-full w-24 md:w-28"
              />
              <div className="flex flex-col w-3/4 items-end justify-between h-full">
                <div className="text-sm font-semibold md:text-md">
                  {item.title}
                </div>
                <div className="flex gap-4 items-center justify-around">
                  <button className="p-2 rounded-lg text-pink-500 text-xs border border-pink-500 text-white font-bold md:text-sm">
                    Share
                  </button>
                  <button className="p-2 rounded-lg bg-pink-500 text-xs text-white font-bold md:text-sm">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Loading />
        )}
        </div>
    </main>
  );
}
