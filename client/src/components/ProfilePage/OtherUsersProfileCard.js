import React from "react";
import ProfileName from "./ProfileName";

const OtherUsersProfileCard = (props) => {
  const user = props.user;

  return (
    <div className="fixed top-[6rem] left-[6rem] flex flex-col items-center bg-slate-100 w-[25vw] py-[1.5rem] rounded-xl shadow-xl duration-[0.4s] hover:scale-105 hover:shadow-md hover:cursor-pointer">
      <div className="border-8 border-blue-100 shadow-2xl bg-[url('/public/profile.jpg')] bg-cover w-[9rem] h-[9rem] rounded-full"></div>

      <ProfileName user={user} />
      <div className="mt-[2rem] button flex items-center justify-center bg-[#1d4ed8] text-[white] font-medium w-[240px] p-[10px] border-none rounded-full cursor-pointer">
        <span>Connect</span>
      </div>
    </div>
  );
};

export default OtherUsersProfileCard;
