import React from "react";
import { Link } from "react-router-dom";
import FeedPageComp from "../components/FeedPage/FeedPageComp";

const Feed = () => {
  return (
    <div>
      <FeedPageComp />
      <Link to="/profile">
        <div>Profile</div>
      </Link>
    </div>
  );
};

export default Feed;
