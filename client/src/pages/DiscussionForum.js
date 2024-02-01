import React, { useEffect } from "react";
// import { useLocation } from "react-router-dom";
import { MainDiscussion } from "../components/DiscussionForum/MainDiscussion";
import getDiscussions from "../fetch/discussions";
import Navbar from "../components/Navbar/Navbar";
import Topbar from "../components/Navbar/topbar";

const DiscussionForum = (props) => {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const [discussions, setDiscussions] = React.useState([]);

  useEffect(() => {
    getDiscussions()
      .then((res) => {
        setDiscussions(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div className="relative flex flex-col md:flex-row bg-[#F8F8F8] w-screen min-h-[100vh]">
        <Navbar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <div className="w-full">
          <Topbar />
          <MainDiscussion discussions={discussions} />
        </div>
        <div className="fixed flex justify-center shadow items-center bottom-2 right-2 w-[60px] h-[60px] bg-[#FFFFFF] rounded-full">
          <img
            src="images/chat.svg"
            alt="chat"
            className="w-[50%] h-[50%] md:w-[65%] md:h-[65%] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default DiscussionForum;
