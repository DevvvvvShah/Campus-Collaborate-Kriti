import React from "react";
import { useNavigate } from "react-router-dom";

const ProfilePageTopBar = (props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    console.log("Logout button clicked");

    // Redirect to home page
    navigate("/");
  };
  const handleSearch = () => {
    if (window.innerWidth < 768) {
      const search = document.querySelector("input");
      search.classList.toggle("hidden");
      const topic = document.querySelector(".topic");
      const profile = document.querySelector(".profile");
      const searchIcon = document.querySelector(".icon");
      if (search.classList.contains("hidden")) {
        topic.classList.remove("hidden");
        profile.classList.remove("hidden");
        searchIcon.classList.remove("absolute");
        search.classList.remove("w-[90vw]");
      } else {
        topic.classList.add("hidden");
        profile.classList.add("hidden");
        searchIcon.classList.add("absolute");
        search.classList.add("w-[90vw]");
      }
    }
  };

  return (
    <div className="w-[94.9rem] bg-white drop-shadow-md">
      <div className="ml-[6.5rem] flex items-center gap-[12rem] py-[0.5rem] justify-start">
        <div className=" text-center hidden md:block text-2xl font-bold">
          PeerPulse
        </div>
        <div className="topic md:text-xl h-fit pl-[2vw]">{props.title}</div>
        <div className="flex items-center">
          <div className=" ml-[8rem] relative min-w-[2rem] md:max-w-[20rem]">
            <img
              src="images/search.svg"
              alt="Description"
              className="icon md:absolute left-3 top-2 object-cover object-center w-[1rem] h-[1.05rem]"
              onClick={handleSearch}
            />
            <input
              type="text"
              className="bg-[#EEE] rounded-full md:block hidden px-8 py-1 focus:outline-none"
              placeholder="Search"
            />
          </div>
          <div className="profile bg-[#CCC] mr-[5vw] ml-[2vw] w-[30px] h-[30px] shadow rounded-full"></div>
        </div>
        <button
          onClick={handleLogout}
          className=" py-1 px-2 mr-2 rounded bg-blue-500 text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePageTopBar;
