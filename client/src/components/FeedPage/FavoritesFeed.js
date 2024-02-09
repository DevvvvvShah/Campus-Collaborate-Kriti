import React, { useEffect } from "react";
import { FeedSection } from "./FeedSection";
import { getFavorites } from "../../fetch/feed";

const FavoritesFeed = (props) => {
  const [posts, setPosts] = React.useState([]);
  useEffect(() => {
    console.log("Running useEffect");
    getFavorites()
      .then((res) => {
        setPosts(res.data);
        //console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="ml-[20rem] pt-8 ">
      <FeedSection posts={posts} />
    </div>
  );
};

export { FavoritesFeed };
