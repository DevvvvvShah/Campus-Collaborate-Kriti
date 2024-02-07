import React, { useEffect, useState } from "react";
import { FeedSection } from "./FeedSection";
import { getPosts } from "../../fetch/feed";

const MainFeed = (props) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const postSearch = props.postSearch;
  useEffect(() => {
    console.log("Running useEffect");
    getPosts()
    .then((res) => {
      setPosts(res.data);
      setFilteredPosts(res.data);
      //console.log(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }, [])
  
  useEffect(() => {
    console.log(postSearch);
    if(postSearch){
      const filteredPosts = posts.filter((post) => post.caption.toLowerCase().includes(postSearch.toLowerCase()));
      console.log(filteredPosts);
      setFilteredPosts(filteredPosts);
    }
    else{
      setFilteredPosts(posts);
    }
  }
  ,[postSearch, posts])

  return (
    <div className="pt-8 w-[95rem] flex justify-center">
      <FeedSection posts={filteredPosts} />
    </div>
  );
};

export { MainFeed };
