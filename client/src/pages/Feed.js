import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { MainFeed } from "../components/FeedPage/MainFeed";
import { getPosts } from "../fetch/feed";
import Navbar from "../components/Navbar/Navbar";
import Topbar from "../components/Navbar/Topbar";
import { FollowingFeed } from "../components/FeedPage/FollowingFeed";
import { FavoritesFeed } from "../components/FeedPage/FavoritesFeed";
import AddFeed from "../components/FeedPage/addFeed";

const Feed = (props) => {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const [posts, setPosts] = React.useState([]);
  const [postSearch, setPostSearch] = React.useState("");
  const [isAddPost, setIsAddPost] = React.useState(false);
  //   const [currentTab, setCurrentTab] = React.useState("global");

  const [activeTab, setActiveTab] = useState("global");

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    getPosts()
      .then((res) => {
        setPosts(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "global":
        return <MainFeed postSearch={postSearch} />;
      case "following":
        return <FollowingFeed postSearch={postSearch} />;
      case "favorites":
        return <FavoritesFeed postSearch={postSearch} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        <div className=" flex flex-col md:flex-row bg-[#F8F8F8] w-[100vw] min-h-[100vh]">
          <Navbar
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            select={{ questions: true }}
          />
          <div className={`flex justify-center rounded-xl items-center z-50 
          w-screen h-screen bg-[#00000022] fixed top-0 left-0
          ${isAddPost ? ' block' : ' hidden'}`}>
            <AddFeed setIsAddFeed={setIsAddPost}/>
          </div>          
          <div className="w-[100vw]">
            <Topbar title="Feed" postSearch={postSearch} setPostSearch={setPostSearch}/>
            <div className="bg-white">
              <div className=" ml-[24vw] flex items-center justify-around py-3">
                <div className="flex justify-center w-[33.33%]  border-r-2 border-[lightgrey]">
                  <button
                    className={`text-xl focus:outline-none  ${
                      activeTab === "global"
                        ? "font-bold text-[#1d4ed8]"
                        : "text-gray-700"
                    }`}
                    onClick={() => handleTabChange("global")}
                  >
                    Global
                  </button>
                </div>
                <div className="flex justify-center  w-[33.33%] border-r-2 border-[lightgrey]">
                  <button
                    className={`text-xl focus:outline-none ${
                      activeTab === "following"
                        ? "font-bold text-[#1d4ed8]"
                        : "text-gray-700"
                    }`}
                    onClick={() => handleTabChange("following")}
                  >
                    Following
                  </button>
                </div>
                <div className="flex justify-center w-[33.33%]">
                  <button
                    className={`text-xl focus:outline-none ${
                      activeTab === "favorites"
                        ? "font-bold text-[#1d4ed8]"
                        : "text-gray-700"
                    }`}
                    onClick={() => handleTabChange("favorites")}
                  >
                    Favorites
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4">{renderTabContent()}</div>
          </div>
        </div>
        <div
          className="fixed flex justify-center shadow-lg items-center gap-2 md:bottom-2 md:right-2 bottom-[9vh] right-2
                      w-[180px] h-[45px] bg-[#FFFFFF] rounded-full "
          onClick={() => setIsAddPost(true)}
        >
          <img
            src="images/add.svg"
            alt="add"
            className={`w-[50%] h-[50%] md:w-fit md:h-[65%] object-contain`}
          />
          <div className="text-[#0016DA] text-[0.875rem] font-semibold">
            Add Post
          </div>
        </div>        
      </div>
    </div>
  );
};

export default Feed;
