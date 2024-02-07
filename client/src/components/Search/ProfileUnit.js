import React from 'react';
import { Link } from 'react-router-dom';


const ProfileUnit = ({ user }) => {
  return (
    <div className='border border-gray-300 m-2 bg-white p-2 text-[#0016DA] flex' >
      <img src={user && user.profilePic} className=' p-1 rounded-full size-[2rem]' alt="Profile" />
      <h2>
        <Link to={`/profile/${user && user._id}`}>{user && user.name}</Link>
      </h2>
    </div>
  );
};

export default ProfileUnit;
