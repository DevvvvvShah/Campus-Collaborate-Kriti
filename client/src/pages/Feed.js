import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { MainFeed } from "../components/FeedPage/MainFeed";
import { getPosts } from "../fetch/feed";
import Navbar from "../components/Navbar/Navbar";
import Topbar from "../components/Navbar/Topbar";
import { FollowingFeed } from "../components/FeedPage/FollowingFeed";
import { FavoritesFeed } from "../components/FeedPage/FavoritesFeed";

const Feed = (props) => {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const [posts, setPosts] = React.useState([]);
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
        return <MainFeed />;
      case "following":
        return <FollowingFeed />;
      case "favorites":
        return <FavoritesFeed />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        <div className=" flex flex-col md:flex-row bg-[#F8F8F8] w-[95rem] min-h-[100vh]">
          <Navbar
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            select={{ questions: true }}
          />
          <div className="w-[95rem]">
            <Topbar title="Feed" />
            <div className="bg-white">
              <div className=" ml-[24rem] flex items-center justify-around py-3">
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
      </div>
    </div>
  );
};

export default Feed;
