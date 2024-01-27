import React from "react";
import SkillsTiles from "./SkillsTiles";
import ViewsLikes from "./ViewsLikes";

function ProfileCard() {
  return (
    <div className="flex flex-col items-center py-[1rem] w-[20rem] absolute bg-[#fff] top-[3rem] left-[5rem] rounded-xl">
      <div className="bg-[#46D97E] w-[120px] h-[120px] rounded-full"></div>
      <div className="flex flex-col items-center py-[1rem]">
        <span className="text-2xl text-[#46D97E] font-bold">MS Dhoni</span>
        <h4 className="text-[#6A6E79] font-semibold">Department of design</h4>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-center px-[0.6rem] text-sm text-[#6A6E79]">
          Hey, I am an aspiring Graphic and product designer, right now I am
          working on a web design assignment for an inter hostel championship
          known as Kriti. I have done no course and am totally newbie to this
          field. All the Best!!
        </p>
      </div>
      <div className="w-[100%] flex justify-start mt-[1.5rem] ml-[2rem]">
        <SkillsTiles value="UI/UX" />
        <SkillsTiles value="Python" />
        <SkillsTiles value="React" />
        <SkillsTiles value="Docker" />
      </div>
      <div className="w-[100%] flex flex-col items-start py-[1.5rem] px-[1rem]">
        <ViewsLikes Value="Project View" Number="125000" />
        <ViewsLikes Value="Posts Likes" Number="456200" />
        <ViewsLikes Value="Project View" Number="4971" />
      </div>
      <div className="w-[100%] flex flex-col items-start px-[1rem]">
        <div className="flex items-center justify-center">
          <div>
            <img src="/sms.jpg" alt="logo" className="h-[1.2rem] w-[1.2rem]" />
          </div>
          <div className="ml-[0.3rem] mb-[0.2rem]">
            <span className="text-md">xyz@email.com</span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div>
            <img src="/sms.jpg" alt="logo" className="h-[1.2rem] w-[1.2rem]" />
          </div>
          <div className="mb-[0.2rem] ml-[0.3rem]">
            <span className="text-md">xyz@email.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
