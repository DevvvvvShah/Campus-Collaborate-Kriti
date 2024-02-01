import React from "react";

const HeaderImg = () => {
  return (
    <div>
      <div className="relative flex justify-center">
        <img
          className="h-[27vh] w-[100vw] object-cover"
          src="/bgxyz.jpeg"
          alt="logo"
        />
      </div>
      <div className="border-8 border-[white] shadow-2xl absolute bg-[url('/public/profile.jpg')] bg-cover top-[7rem] left-[12rem] w-[12rem] h-[12rem] rounded-full bg-[green]"></div>
    </div>
  );
};

export default HeaderImg;
