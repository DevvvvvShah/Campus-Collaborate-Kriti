import React, { useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
// import Bars3Icon from "heroicons/react";

function Navbar() {
  const isAboveMediumScreens = useMediaQuery("(min-width: 600px)");
  const [isMenuToggled, setIsMenuToggled] = useState(false);

  return (
    <nav>
      <div className="w-full h-[3rem] bg-gradient-to-r from-emerald-500 to-emerald-700 flex items-center">
        <div className="h-[100%] flex justify-start items-center w-[25%] px-[5rem]">
          <div className="h-[100%]">
            <img
              className="mix-blend-color-burn h-[100%]"
              src="/magic-star.jpg"
              alt="appLogo"
            />
          </div>
          <div className="ml-[0.5rem]">XYZ</div>
        </div>
        {isAboveMediumScreens ? (
          <div className=" flex justify-end mr-[5rem] h-[3rem] w-[100%]">
            {/* <div className=" flex justify-around items-center w-[35%]">
              <input
                placeholder="Search"
                type="text"
                className="w-[80%] rounded-xl border-2 border-grey px-[1rem]"
              />
            </div> */}
            <div className="flex justify-around items-center w-[35%]">
              <div className="h-[100%] flex items-center">
                <img
                  className="mix-blend-color-burn h-[55%] hover:cursor-pointer"
                  src="/profile-2user.jpg"
                  alt="logo"
                />
              </div>
              <div className="h-[100%]  flex items-center">
                <img
                  className="mix-blend-color-burn h-[55%]"
                  src="/book.jpg"
                  alt="logo"
                />
              </div>
              <div className="h-[100%]  flex items-center">
                <img
                  className="mix-blend-color-burn h-[55%]"
                  src="/note.jpg"
                  alt="logo"
                />
              </div>
              <div className="h-[100%]  flex items-center">
                <img
                  className="mix-blend-color-burn h-[55%]"
                  src="/Subtract.jpg"
                  alt="logo"
                />
              </div>
              <div className="h-[100%]  flex items-center">
                <img
                  className="mix-blend-color-burn h-[55%]"
                  src="/profile-2user.jpg"
                  alt="logo"
                />
              </div>
            </div>
          </div>
        ) : (
          <button
            className="rounded-full bg-secondary-500 p-2"
            onClick={() => setIsMenuToggled(!isMenuToggled)}
          >
            <img
              src="/Subtract.jpg"
              alt="logo"
              className="h-6 w-6 text-white"
            />
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
