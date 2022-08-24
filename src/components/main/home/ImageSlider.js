import React, { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL, list } from "firebase/storage";

import loadinImg from "../../../assets/loader.gif";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function ImageSlider() {
  // const storage = getStorage();
  // const listRef = ref(storage, '/swiper-bg');

  const [img, setImg] = useState([]);
  const [loadInit, setLoadInit] = useState([]);

  useEffect(() => {
    async function pageTokenExample() {
      // Create a reference under which you want to list
      const storage = getStorage();
      const listRef = ref(storage, "/swiper-bg");

      // Fetch the first page of 100.
      const firstPage = await list(listRef, { maxResults: 3 });
      firstPage.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
          if (img.indexOf(url) === -1) {
            setImg((prevImg) => [...prevImg, url]);
          }
        });
      });
      if (img.length === 3) {
        setLoadInit(img);
      }
    }
    pageTokenExample();
  }, [img]);

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper h-full"
    >
      {loadInit.length !== 0 ? (
        loadInit.map((items, id) => (
          <SwiperSlide key={id}>
            <img
              className="object-cover h-full w-full"
              src={items}
              alt="Empree Tee"
            />
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide>
          <img
            className="object-cover h-full w-full"
            src={loadinImg}
            alt="Empree Tee"
          />
        </SwiperSlide>
      )}
    </Swiper>
  );
}
