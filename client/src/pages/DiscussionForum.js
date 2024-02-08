import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { MainDiscussion } from "../components/DiscussionForum/MainDiscussion";
import { getDiscussions } from "../fetch/discussions";
import Navbar from "../components/Navbar/Navbar";
import Topbar from "../components/Navbar/Topbar";
import ChatBot from "../chatBot/ChatBot";
import AddDiscussion from "../components/DiscussionForum/addDiscussions";

const DiscussionForum = (props) => {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const [discussions, setDiscussions] = React.useState([]);
  const [filteredDiscussions, setFilteredDiscussions] = React.useState([]);
  const [chatBot, setChatBot] = React.useState(false);
  const [isAddDiscussion, setIsAddDiscussion] = React.useState(false);
  const chatBotRef = useRef(null);
  const [selectedOption, setSelectedOption] = React.useState("");

  function handleChat() {
    setChatBot((prev) => !prev);
  }

  useEffect(() => {
    getDiscussions()
      .then((res) => {
        res.data.sort((a, b) => new Date(b.postingTime) - new Date(a.postingTime));
        setDiscussions(res.data);
        setFilteredDiscussions(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (chatBotRef.current && !chatBotRef.current.contains(event.target)) {
        setChatBot(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let temp = [...filteredDiscussions];
    if (selectedOption === "upvotes") {
      temp.forEach((discussion) => { console.log(discussion.upvotes.length); });
      temp.sort((a, b) => b.upvotes.length - a.upvotes.length);
      temp.forEach((discussion) => { console.log(discussion.upvotes.length); });
      console.log(temp);
    } else if (selectedOption === "views") {
      temp.sort((a, b) => b.views - a.views);
    } else if (selectedOption === "comments") {
      temp.sort((a, b) => b.comments.length - a.comments.length);
    }
    else{
      temp.sort((a, b) => new Date(b.postingTime) - new Date(a.postingTime));
    }
    setFilteredDiscussions(temp);
  }, [selectedOption]);

  return (
    <div>
      <div>
        <div className="relative flex flex-col md:flex-row bg-[#F8F8F8] w-screen min-h-[100vh]">
          <Navbar
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            select={{ questions: true }}
          />
          <div className={`flex justify-center rounded-xl items-center z-50 
          w-screen h-screen bg-[#00000022] fixed top-0 left-0
          ${isAddDiscussion ? ' block' : ' hidden'}`}>
            <AddDiscussion setIsAddDiscussion={setIsAddDiscussion}/>
          </div>          
          <div className="w-full">
            <Topbar title="Discussion Forum" discussions={discussions} setFilteredDiscussions={setFilteredDiscussions} />
          <select className="ml-[400px]" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
            <option value="">Sort By</option>
            <option value="upvotes">Upvotes</option>
            <option value="views">Views</option>
            <option value="comments">No. of Comments</option>
          </select>
            <MainDiscussion discussions={filteredDiscussions} />
          </div>
          <div
            ref={chatBotRef}
            className={`fixed flex gap-2 justify-center items-center ${
              chatBot
                ? "bottom-[37vh] right-[14vw]"
                : "md:bottom-2 md:right-2 bottom-[11vh] right-2"
            }`}
          >
            <div
              className="flex justify-center shadow-lg items-center gap-2
                          w-[140px] h-[45px] bg-[#FFFFFF] rounded-full"
              onClick={() => setIsAddDiscussion(true)}
            >
              <img
                src="images/add.svg"
                alt="add"
                className={`w-[50%] h-[50%] md:w-fit md:h-[65%] object-contain`}
              />
              <div className="text-[#0016DA] text-[0.875rem] font-semibold">
                Question
              </div>
            </div>  
            <div className="flex w-[50px] h-[50px] bg-[#FFFFFF] rounded-full justify-center shadow items-center">
              <img
                src="images/chat.svg"
                alt="chat"
                className={`w-[50%] h-[50%] md:w-[65%] md:h-[65%] object-contain ${
                  chatBot ? "hidden" : "block"
                }`}
                onClick={handleChat}
              />
              <div className={`${chatBot ? "block" : "hidden"}`}>
                <ChatBot />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionForum;