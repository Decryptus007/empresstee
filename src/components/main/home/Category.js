import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import cakeCat from "../../../assets/cake-category.png";
import foodCat from "../../../assets/food-cat.png";
import otherCake from "../../../assets/cake-var.png";

export default function Category() {
  const navigate = useNavigate();

  return (
    <section className="my-8">
      <p className="text-lg font-bold py-2 px-4 bg-pink-500/30 w-full">
        <FontAwesomeIcon icon={`fa-solid fa-folder-tree`} className="mx-2" />
        Category
      </p>
      <div className="flex flex-wrap items-center gap-y-2 justify-evenly my-4 p-2">
        <div
          className="cursor-pointer relative w-40 h-44 md:w-44 md:h-48 shadow-xl rounded-lg"
          onClick={() => navigate("/cake-category")}
        >
          <img
            src={cakeCat}
            alt="cake"
            className="object-cover w-full h-full rounded-lg"
          />
          <p className="absolute bottom-0 left-0 text-center py-10 font-bold text-white text-xl bg-gradient-to-t from-pink-500/50 to-pink-200/20 w-full">
            Cakes
          </p>
        </div>
        <div
          className="cursor-pointer relative w-40 h-44 md:w-44 md:h-48 shadow-xl rounded-lg"
          onClick={() => navigate("/other-cakes-category")}
        >
          <img
            src={otherCake}
            alt="cake"
            className="object-cover w-full h-full rounded-lg"
          />
          <p className="absolute bottom-0 left-0 text-center py-10 font-bold text-white text-xl bg-gradient-to-t from-pink-500/50 to-pink-200/20 w-full">
            Cake Variants
          </p>
        </div>
        <div
          className="cursor-pointer relative w-40 h-44 md:w-44 md:h-48 shadow-xl rounded-lg"
          onClick={() => navigate("/food-category")}
        >
          <img
            src={foodCat}
            alt="cake"
            className="object-cover w-full h-full rounded-lg"
          />
          <p className="absolute bottom-0 left-0 text-center py-10 font-bold text-white text-xl bg-gradient-to-t from-pink-500/50 to-pink-200/20 w-full">
            Foods & Snacks
          </p>
        </div>
        {/* <div className="cursor-pointer relative w-40 h-44 md:w-44 md:h-48 shadow-xl rounded-lg">
          <img
            src={cakeCat}
            alt="cake"
            className="object-cover w-full h-full rounded-lg"
          />
          <p className="absolute bottom-0 left-0 text-center py-10 font-bold text-white text-xl bg-gradient-to-t from-pink-500/50 to-pink-200/20 w-full">
            Cakes
          </p>
        </div> */}
      </div>
    </section>
  );
}
