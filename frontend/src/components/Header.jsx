import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className=" sticky top-0 flex border-b-1 border-b-white py-4 px-5 max-w-full items-center justify-between bg-white/10 backdrop-blur-sm hover:bg-pink-300 hover:text-white transition delay-150 duration-300 ease-in-out">
        <h1 className="font-Fleu text-2xl cursor-default sm:text-4xl">BeautyByOneTouch</h1>
        <Link
          to="/adicionar"
          className="border-1 font-light border-white p-2.5 rounded-full cursor-pointer hover:scale-110 transition delay-150 duration-300 ease-in-out text-xs sm:text-base"
        >
          Adicionar meu trabalho
        </Link>
      </div>
    </>
  );
};

export default Header;
