import React, { useEffect, useState } from "react";
import { FeedSection } from "./FeedSection";
import { getPosts } from "../../fetch/feed";

const MainFeed = (props) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    console.log("Running useEffect");
    getPosts()
      .then((res) => {
        setPosts(res.data);
        //console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="pt-8 w-[95rem] flex justify-center">
      <FeedSection posts={posts} />
    </div>
  );
};

export { MainFeed };
