import React from "react";
import ProfilePageComp from "../components/ProfilePage/ProfilePageComp";
// import ProfileHeaderImg from "../components/profileComponents/ProfileHeaderImg";
// import ProfileCard from "../components/profileComponents/ProfileCard";
// import ProfileProjectsSection from "../components/profileComponents/ProfileProjectsSection";
// import Navbar from "../components/Navbar/Navbar";

function ProfilePage() {
  return (
    <div className="h-[100vh]">
      {/* <Navbar />
      <ProfileHeaderImg />
      <div className="flex justify-around">
        <ProfileCard />
        <ProfileProjectsSection />
      </div> */}
      {/* <LandingPageComp /> */}

      {/* <span>ProfilePage</span> */}
      <ProfilePageComp />
    </div>
  );
}

export default ProfilePage;
