import React, { useEffect, useState } from "react";
import axios from "axios";
import fetchProfileFromServer from "../../fetch/profile";
const ProfileName = (prop) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfileFromServer(localStorage.getItem("user"))
      .then((response) => setData(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return "Loading...";
  if (error) return "Error!";

  return (
    <div className="flex flex-col pt-[1rem] pl-[27rem]">
      <span className="text-4xl mb-[0.6rem]"> {data.name} </span>
      <span className="text-sm font-thin">Student At IIT Guwahati</span>
      <div className="text-[grey] flex gap-[6rem] pt-[0.2rem]">
        <div>{data.rollNo}</div>
        <div>{data.program}</div>
        <div>{data.branch}</div>
      </div>
    </div>
  );
};

export default ProfileName;
