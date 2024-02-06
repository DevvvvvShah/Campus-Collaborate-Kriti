import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { MainDiscussion } from "../components/DiscussionForum/MainDiscussion";
import { getDiscussions } from "../fetch/discussions";
import Navbar from "../components/Navbar/Navbar";
import Topbar from "../components/Navbar/Topbar";
import ChatBot from "../chatBot/ChatBot";

const DiscussionForum = (props) => {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const [discussions, setDiscussions] = React.useState([]);
  const [chatBot, setChatBot] = React.useState(false);
  const chatBotRef = useRef(null);

  function handleChat() {
    setChatBot((prev) => !prev);
  }

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

  return (
    <div>
      <div>
        <div className="relative flex flex-col md:flex-row bg-[#F8F8F8] w-screen min-h-[100vh]">
          <Navbar
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            select={{ questions: true }}
          />
          <div className="w-full">
            <Topbar title="Discussion Forum" />
            <MainDiscussion discussions={discussions} />
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
