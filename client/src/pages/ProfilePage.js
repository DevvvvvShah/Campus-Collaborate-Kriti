import React from "react";
import ProfileHeaderImg from "../components/profileComponents/ProfileHeaderImg";
import ProfileCard from "../components/profileComponents/ProfileCard";
import ProfileProjectsSection from "../components/profileComponents/ProfileProjectsSection";

function ProfilePage() {
  return (
    <div className="h-[100vh] bg-[#132D46]">
      <ProfileHeaderImg />
      <ProfileCard />
      <ProfileProjectsSection />
    </div>
  );
}

export default ProfilePage;
