import React from "react";
// import axios from "axios";
import HeaderImg from "./HeaderImg";
import ProfileCard from "./ProfileCard";
import ProfileHeroSection from "./ProfileHeroSection";

function ProfilePageComp(props) {
  const user = props.user;
  return (
    <div>
      <HeaderImg />
      <ProfileCard user = {user} />
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
