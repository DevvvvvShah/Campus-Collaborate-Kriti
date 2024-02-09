import React from "react";
// import axios from "axios";
import HeaderImg from "./HeaderImg";
import ProfileCard from "./ProfileCard";
import ProfileHeroSection from "./ProfileHeroSection";
import ProfilePageTopBar from "./ProfileTopBar";
import ProfileNavBar from "./ProfileNavBar";

function ProfilePageComp(props) {
  const user = props.user;

  return (
    <div>
      <ProfilePageTopBar />
      {/* <ProfileNavBar /> */}
      <HeaderImg />
      <ProfileCard user={user} />
      <ProfileHeroSection user={user} />
    </div>
  );
}

export default ProfilePageComp;
