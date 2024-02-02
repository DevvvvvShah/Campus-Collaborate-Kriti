import React from "react";
// import axios from "axios";
import HeaderImg from "./HeaderImg";
import ProfileName from "./ProfileName";
import ProfileHeroSection from "./ProfileHeroSection";

function ProfilePageComp() {


  return (
    <div>
      <HeaderImg />
      <ProfileName/>
      <ProfileHeroSection />
    </div>

    // <div className="flex flex-col items-center justify-center">
    //   <h1>User</h1>
    //   <ul>{data.name}</ul>
    //   <ul>{data.rollNo}</ul>
    //   <ul>{data.program}</ul>
    //   <ul>{data.year}</ul>
    //   <ul>{data.branch}</ul>
    // </div>
  );
}

export default ProfilePageComp;
