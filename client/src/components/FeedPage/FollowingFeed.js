import React, { useEffect } from "react";
import { FeedSection } from "./FeedSection";
import { getMyConnectionPosts } from "../../fetch/feed";

const FollowingFeed = (props) => {
  const [posts, setPosts] = React.useState([]);
  useEffect(() => {
    console.log("Running useEffect");
    getMyConnectionPosts()
      .then((res) => {
        setPosts(res.data);
        //console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className=" pt-8">
      <FeedSection posts={posts} />
    </div>
  );
};

export { FollowingFeed };
