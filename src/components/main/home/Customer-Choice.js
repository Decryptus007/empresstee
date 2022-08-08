import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getStorage, ref, getDownloadURL, list } from "firebase/storage";

import cake from "../../../assets/loadingImg.webp";

export default function CustomerChoice() {
  const [img, setImg] = useState([]);
  const [loadInit, setLoadInit] = useState([]);

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

  return (
    <section className="">
      <div className="w-full flex items-center justify-between text-black">
        <small className="text-md">
          <FontAwesomeIcon icon={`fa-solid fa-star`} className="mx-px" />
          Customer's Choice
          <NavLink
            to={"/"}
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
                  <img src={url} alt="Cake Collection" className="object-cover w-full h-full" loading="lazy" />
                </div>
              </div>
            ))
          ) : (
            <div className="inline-block px-3">
              <div className="w-52 h-52 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <img src={cake} alt="Cake Collection" className="object-cover w-full h-full" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
