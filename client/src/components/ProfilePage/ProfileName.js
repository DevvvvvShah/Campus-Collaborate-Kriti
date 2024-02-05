import React, { useEffect, useState } from "react";
// import axios from "axios";
import fetchProfileFromServer from "../../fetch/profile";
const ProfileName = (props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = props.user;

  useEffect(() => {
    setData(user);
    setLoading(false);
  }, [user]);

  if (loading) return "Loading...";
  if (error) return "Error!";

  return (
    <div className="flex flex-col items-center pt-[1rem] ">
      <span className="text-xl font-bold text-[#131313dd]">{data && data.name}</span>
      <span className=" text-[#9d9a9a] mt-[0.8rem] text-sm font-medium text-center px-[1rem]">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi
        numquam delectus cumque vitae atque, necessitatibus facere dolorum
        pariatur veritatis.
      </span>
      <div className="flex gap-8 pt-[0.8rem]">
        <div>
          <span className="font-medium text-sm">{data && data.rollNo}</span>
        </div>
        <div>
          <span className="font-medium text-sm">{data && data.program}</span>
        </div>
        <div>
          <span className="font-medium text-sm">{data && data.branch}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileName;
