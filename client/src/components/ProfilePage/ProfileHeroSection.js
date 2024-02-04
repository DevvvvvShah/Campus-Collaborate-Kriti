import React, { useState } from "react";
import Card from "../Projects/Card";
import Connection from "./Connection";

const ProfileHeroSection = () => {
  const [card, setCard] = useState("projects");
  const [isActive1, setIsActive1] = useState(true);
  const [isActive2, setIsActive2] = useState(false);

  const onCLickButton1 = () => {
    setIsActive1(true);
    setCard("projects");
    setIsActive2(false);
  };
  const onCLickButton2 = () => {
    setIsActive2(!isActive2);
    setCard("connections");
    setIsActive1(false);
  };

  return (
    <div className="flex flex-col gap-10 pl-[35rem]">
      <div className=" pt-[1.5rem]">
        <div className="flex gap-10">
          <button
            onClick={onCLickButton1}
            type="button"
            className={`text-black hover:bg-blue-700 hover:text-white font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 shadow-xl ${
              isActive1 ? "outline-none text-white bg-blue-700" : ""
            }`}
          >
            Projects
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
            <Card />
            <Card />
            <Card />
          </div>
        )}
        {card === "connections" && <Connection />}
      </div>
    </div>
  );
};

export default ProfileHeroSection;
