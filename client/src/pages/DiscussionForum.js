import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { MainDiscussion } from "../components/DiscussionForum/MainDiscussion";
import { getDiscussions } from "../fetch/discussions";
import Navbar from "../components/Navbar/navbar";
import Topbar from "../components/Navbar/topbar";
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
            className={`fixed flex justify-center shadow items-center ${
              chatBot
                ? "bottom-[37vh] right-[14vw]"
                : "md:bottom-2 md:right-2 bottom-[11vh] right-2"
            } w-[60px] h-[60px] bg-[#FFFFFF] rounded-full`}
          >
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
      <div className="fixed flex justify-center shadow items-center bottom-2 right-2 w-[60px] h-[60px] bg-[#FFFFFF] rounded-full">
        <img
          src="images/chat.svg"
          alt="chat"
          className="w-[50%] h-[50%] md:w-[65%] md:h-[65%] object-contain"
        />
      </div>
    </div>
  );
};

export default DiscussionForum;
