import React from "react";
import { Link } from "react-router-dom";

const Feed = () => {
  return (
    <div>
      <div>Feed</div>
      <Link to="/profile">
        <div>Profile</div>
      </Link>
    </div>
  );
};

export default Feed;
