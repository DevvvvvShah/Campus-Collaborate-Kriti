import OtherProfilePageComp from "../components/ProfilePage/OtherProfilePageComp";
import { fetchOtherUserProfile } from "../fetch/profile";
import { React, useEffect, useState } from "react";

// import ProfileHeaderImg from "../components/profileComponents/ProfileHeaderImg";
// import ProfileCard from "../components/profileComponents/ProfileCard";
// import ProfileProjectsSection from "../components/profileComponents/ProfileProjectsSection";
// import Navbar from "../components/Navbar/Navbar";

function OtherProfilePage() {
  console.log(window.location.href);
  const userId = window.location.pathname.split("/")[2];
  console.log(userId);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchOtherUserProfile(userId)
      .then((res) => {
        setUser(res);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  return (
    <div className="h-[100vh]">
      <OtherProfilePageComp user={user} />
    </div>
  );
}

export default OtherProfilePage;