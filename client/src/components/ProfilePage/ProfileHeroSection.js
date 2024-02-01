import React from "react";

const ProfileHeroSection = () => {
  return (
    <div className="flex bg-[#dad8d884] gap-10 min-h-[22.8rem] m-auto border-2  mt-[4rem] pl-[8rem]">
      <div className="flex flex-col items-center  pt-[1.5rem] w-[20rem]">
        <div className="flex flex-col">
          <span className="text-[grey]">984646535</span>
          <span className="text-[grey]">679864648</span>
        </div>
        <div className="flex flex-col mt-[1.2rem]">
          <span className="text-sm">xyz@gmail.com</span>
          {/* <span>xyz@gmail.com</span> */}
        </div>

        <div className="mt-[5rem] button flex items-center justify-center bg-[#4942E4] text-[white] font-medium w-[240px] p-[10px] border-none rounded-full cursor-pointer">
          <span>Edit Profile</span>
        </div>
      </div>
      <div className=" pt-[1.5rem]">
        <div className="flex gap-10">
          <div className=" buttons cursor-pointer">
            <span>Projects</span>
          </div>
          <div className="  buttons cursor-pointer">
            <span>Courses</span>
          </div>
          <div className=" buttons cursor-pointer">
            <span>Connections</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeroSection;
