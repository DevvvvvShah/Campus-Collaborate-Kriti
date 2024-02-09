import React, { useState } from "react";
import Card from "../Projects/Card";
import Connection from "./Connection";
import Portfolio from "./Portfolio";
import ProfileProjects from "./ProfileProjects";

const ProfileHeroSection = (props) => {
  const user = props.user;

  const [card, setCard] = useState("projects");
  const [isActive1, setIsActive1] = useState(true);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);

  const isAdmin = true;

  const onCLickButton1 = () => {
    setIsActive1(true);
    setCard("projects");
    setIsActive2(false);
    setIsActive3(false);
  };

  const onCLickButton2 = () => {
    setIsActive2(!isActive2);
    setCard("connections");
    setIsActive1(false);
    setIsActive3(false);
  };

  const onCLickButton3 = () => {
    setIsActive3(!isActive3);
    setCard("portfolio");
    setIsActive1(false);
    setIsActive2(false);
  };

  return (
    <div className="flex flex-col gap-10 pl-[35rem] bg-white">
      <div className=" pt-[1.5rem]">
        <div className="flex gap-10">
          {isAdmin && (
            <button
              onClick={onCLickButton1}
              type="button"
              className={`text-black hover:bg-blue-700 hover:text-white font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 shadow-xl ${
                isActive1 ? "outline-none text-white bg-blue-700" : ""
              }`}
            >
              Projects
            </button>
          )}

          <button
            onClick={onCLickButton3}
            type="button"
            className={`text-black hover:bg-blue-700 hover:text-white font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 shadow-xl ${
              isActive3 ? "outline-none text-white bg-blue-700" : ""
            }`}
          >
            Portfolio
          </button>
          <button
            onClick={onCLickButton2}
            type="button"
            className={`text-black hover:bg-blue-700 hover:text-white font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 shadow-xl ${
              isActive2 ? "outline-none text-white bg-blue-700" : ""
            }`}
          >
            Connection
          </button>
        </div>
      </div>
      <div className="flex">
        {card === "projects" && (
          <div className="flex flex-wrap">
            <ProfileProjects />
          </div>
        )}
        {card === "connections" && (
          <div className="flex flex-col">
            <Connection user={user} />
          </div>
        )}
        {card === "portfolio" && <Portfolio />}
      </div>
    </div>
  );
};

export default ProfileHeroSection;
