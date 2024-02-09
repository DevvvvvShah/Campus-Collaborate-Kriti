import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Tab(props) {
  return (
    <NavLink
      to={props.to}
      activeClassName="active"
      className="grid grid-cols-12 md:w-full py-2 px-2 md:px-0 md:py-2 md:mb-2 rounded-full md:rounded-none"
    >
      <div className="col-span-12 flex items-center justify-center">
        <img
          src={"images/" + props.img + ".png"}
          alt="Description"
          className="object-cover object-center w-[1rem] h-[1rem] ml-[2rem] mb-[3rem]"
        />
      </div>
    </NavLink>
  );
}

function ProfileNavBar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isTop, setIsTop] = useState(true);

  const handleHover = () => {
    setIsExpanded(true);
  };

  const handleLeave = () => {
    setIsExpanded(false);
  };

  //   React.useEffect(() => {
  //     const handleScroll = () => {
  //       const scrollTop = window.scrollY || document.documentElement.scrollTop;
  //       setIsTop(scrollTop === 0);
  //     };

  //     window.addEventListener("scroll", handleScroll);

  //     return () => {
  //       window.removeEventListener("scroll", handleScroll);
  //     };
  //   }, []);

  return (
    <div
      className={`md:h-full md:max-w-[12rem] z-10 fixed min-w-[2rem] transition-all duration-700 md:top-0 md:left-0 bottom-0 left-0
    transform bg-white border-r-[1px] drop-shadow-lg w-full ${
      isExpanded || isTop ? "md:w-[4vw]" : "md:w-[2vw]"
    }`}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <div className="w-[35%]">
        <div className="md:pt-[10vh] md:px-0 py-[2vh] items-center align-center flex-col text-xl text-[#424242] flex md:justify-normal justify-between">
          <Tab to="/feed" img="home" />
          <Tab to="/courseReview" img="courses" />
          <Tab to="/projects" img="projects" />
          <Tab to="/discussion" img="questions" />
          <Tab to = "/search" img="search" />
        </div>
      </div>
    </div>
  );
}

export default ProfileNavBar;
