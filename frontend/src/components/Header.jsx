import React from "react";

const Header = () => {
  return (
    <>
      <div className="sticky top-0 flex rounded-full my-2 py-2 max-w-fit items-center mx-auto text-white bg-white/20 backdrop-blur-xs backdrop-contrast-125 backdrop-saturate-100 bg-clip-padding z-10">
        <div>
          <h1 className="font-Fleu text-4xl px-4 border-r-2">BeautyByOneTouch</h1>
        </div>

        <div className="items-center flex px-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8"
          >
            <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z" />
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </>
  );
};
    
export default Header;