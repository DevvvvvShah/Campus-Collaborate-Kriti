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
    <div className="flex flex-col items-center pt-[1rem] ">
      <span className="text-xl font-bold text-[#131313dd]">{data.name}</span>
      <span className=" text-[#9d9a9a] mt-[0.8rem] text-sm font-medium text-center px-[1rem]">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi
        numquam delectus cumque vitae atque, necessitatibus facere dolorum
        pariatur veritatis.
      </span>
      <div className="flex gap-8 pt-[0.8rem]">
        <div>
          <span className="font-medium text-sm">{data.rollNo}</span>
        </div>
        <div>
          <span className="font-medium text-sm">{data.program}</span>
        </div>
        <div>
          <span className="font-medium text-sm">{data.branch}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileName;
