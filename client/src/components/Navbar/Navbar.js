import React, { useState } from "react";
import { Link } from "react-router-dom";

function Tab(props) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  let tabStyle;
  props.select
    ? (tabStyle = { boxShadow: "0px 7px 20px rgba(0, 0, 0, 0.2)" })
    : (tabStyle = {});

  return (
    <div
      className={`grid grid-cols-12 md:w-full py-2 px-2 md:px-0 md:py-2 md:mb-2 rounded-full md:${
        tabStyle.boxShadow ? " border-b-2 border-blue-700" : ""
      }
        md:rounded-none ${isHovered ? "drop-shadow-lg" : ""}`}
      style={tabStyle}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <div className="col-span-12 md:col-span-5 flex items-center">
        <img
          src={"images/" + props.img + ".png"}
          alt="Description"
          className="mx-auto ml-auto mr-[10%] object-cover object-center w-[1.25rem] h-[1.25rem]"
        />
      </div>
      <div className="md:col-span-7 hidden md:block">{props.name}</div>
    </div>
  );
}

function Navbar(props) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isTop, setIsTop] = useState(true);

  const handleHover = () => {
    setIsExpanded(true);
  };

  const handleLeave = () => {
    setIsExpanded(false);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsTop(scrollTop === 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`md:h-[full] md:max-w-[25rem] z-10 fixed min-w-[12.5rem] transition-all duration-700 md:top-0 md:left-0 bottom-0 left-0
            transform bg-white border-r-[1px] drop-shadow-lg w-full ${
              isExpanded || isTop ? "md:w-[25vw]" : "md:w-[20vw]"
            }`}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <div className="pt-[2vh] text-center hidden md:block text-2xl font-bold">
        PeerPulse
      </div>
      <div className="w-full">
        <div className="md:pt-[10vh] px-10 md:px-0 py-[2vh] items-center align-center text-xl text-[#424242] flex md:justify-normal justify-between md:flex-col">
          <Tab name="Home" img="home" />
          <Tab name="Courses" img="courses" />
          <Tab name="Projects" img="projects" />
          <Tab name="Questions" img="questions" select={true} />
          <Tab name="Something" img="something" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
