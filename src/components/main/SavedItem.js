import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../Aux/Navbar";
import { deleteField, doc, getDoc, updateDoc } from "firebase/firestore";
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
  const [noItems, setNoItems] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const [img, setImg] = useState("");

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
        let objKeys = Object.keys(objItems);
        if (objKeys.length < 1) {
          setNoItems(true);
          setCheckItems([]);
        }
        setCheckItems([]);
        for (const iterator in objItems) {
          if (Object.hasOwnProperty.call(objItems, iterator)) {
            const el = objItems[iterator];
            setCheckItems((prev) => [...prev, el]);
          }
        }
      } else {
        setNoItems(true);
      }

      if (docSnap.data().length < 1) {
        setNoItems(true);
      }
    };
    name();
    return () => (name = "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  async function deleteData(name) {
    await updateDoc(docRef, {
      ["savedItem" + name]: deleteField(),
    });
    await setRefresh(!refresh);
  }

  function shareImage(data, dataTwo) {
    let shareData = {
      title: dataTwo,
      text: `Hey! Check out this product I found on Empress Tee Galore. \nYou can view more products on https://empresstee.vercel.app \n \n`,
      url: data,
    };
    (async function () {
      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          console.log(`Error: ${err}`);
        }
      }
    })();
  }

  function enlargeImg(img) {
    setOpenImg(true);
    setImg(img);
  }

  return (
    <main className="relative container mx-auto bg-white">
      {openImg && (
        <div
          style={{ zIndex: 100 }}
          className="flex items-center justify-center z-30 fixed top-4 left-auto w-full h-full bg-pink-500/20"
        >
          <FontAwesomeIcon
            icon={`fa-solid fa-close`}
            className="fixed left-4 text-3xl font-bold text-black"
            onClick={() => setOpenImg(false)}
          />
          <img src={img} alt="Cake" className="w-52 h-52 object-cover" />
        </div>
      )}
      <Navbar
        toggleSideBar={toggleSideBar}
        sideBarCtrl={sideBarCtrl}
        sideBarState={sideBarState}
      />
      <h2 className="text-lg text-center">Saved Items</h2>
      <div className="flex gap-y-4 flex-col items-center justify-center p-2 mt-4">
        {noItems && (
          <p className="text-lg text-gray-700 font-semibold">
            No Saved Items Yet.
          </p>
        )}
        {checkItems.length ? (
          checkItems.map((item, id) => (
            <div
              key={id}
              className="flex items-center justify-between p-2 rounded-lg bg-gray-100 mx-auto w-full h-24 md:w-96 md:h-32"
            >
              <img
                src={item.img}
                alt="Saved Items"
                className="object-cover h-full w-24 md:w-28"
                onClick={(e) => enlargeImg(e.target.src)}
              />
              <div className="flex flex-col w-3/4 items-end justify-between h-full">
                <div className="text-sm font-semibold md:text-md">
                  {item.title}
                </div>
                <div className="flex gap-4 items-center justify-around">
                  <button
                    className="p-2 rounded-lg text-pink-500 text-xs border border-pink-500 text-white font-bold md:text-sm"
                    onClick={() => shareImage(item.img, item.title)}
                  >
                    Share
                  </button>
                  <button
                    className="p-2 rounded-lg bg-pink-500 text-xs text-white font-bold md:text-sm"
                    onClick={() => deleteData(item.title)}
                  >
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
