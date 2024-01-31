import React from "react";

function ProfileProjectsSection() {
  return (
    <div className="border-2 border-black z-100 top-[15rem] left-[30rem] md:flex flex-col">
      <div className="flex gap-6">
        <div className="flex justify-center items-center font-semibold bg-[#46D97E] rounded-xl">
          <span className="p-[0.3rem] text-sm">PROJECTS</span>
        </div>
        <div className="flex justify-center items-center font-semibold">
          <span className="p-[0.3rem] text-sm text-[#46D97E]">COURSES</span>
        </div>
        <div className="flex justify-center items-center font-semibold">
          <span className="p-[0.3rem] text-sm text-[#46D97E]">QUESTIONS</span>
        </div>
      </div>

      <div></div>
    </div>
  );
}

export default ProfileProjectsSection;
