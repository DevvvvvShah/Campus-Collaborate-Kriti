import React, { useEffect } from "react";
import { FeedSection } from "./FeedSection";
import { getMyConnectionPosts } from "../../fetch/feed";

const FollowingFeed = (props) => {
  const [posts, setPosts] = React.useState([]);
  const postSearch = props.postSearch;
  const [filteredPosts, setFilteredPosts] = React.useState([]);

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

  useEffect(() => {
    console.log(postSearch);
    if (postSearch) {
      const filteredPosts = posts.filter((post) =>
        post.caption.toLowerCase().includes(postSearch.toLowerCase())
      );
      console.log(filteredPosts);
      setFilteredPosts(filteredPosts);
    } else {
      setFilteredPosts(posts);
    }
  }, [postSearch, posts]);

  return (
    <div className="md:ml-[15rem] ml-[1.5rem]">
      <FeedSection posts={filteredPosts} />
    </div>
  );
};

export { FollowingFeed };
