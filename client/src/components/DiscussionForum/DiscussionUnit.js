import React, { useEffect } from "react";
import fetchProfileFromServer from "../../fetch/profile";
import { postComment, putUpvote } from "../../fetch/discussions";

const DiscussionUnit = (props) => {
  const [hoursAgo, setHoursAgo] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [submit, setSubmit] = React.useState(false);
  const [comments, setComments] = React.useState(
    props.discussion.comments.length
  );
  const [upvotes, setUpvotes] = React.useState(props.discussion.upvotes.length);
  const [upvoted, setUpvoted] = React.useState(false);

  useEffect(() => {
    const postingTime = props.discussion.postingTime;
    const currentTime = new Date();
    const timeDifference = currentTime - new Date(postingTime);

    let timeAgo = "";
    if (timeDifference < 60000) {
      // Less than 1 minute
      const secondsAgo = Math.floor(timeDifference / 1000);
      timeAgo = `${secondsAgo} seconds ago`;
    } else if (timeDifference < 3600000) {
      // Less than 1 hour
      const minutesAgo = Math.floor(timeDifference / 60000);
      timeAgo = `${minutesAgo} minutes ago`;
    } else if (timeDifference < 86400000) {
      // Less than 1 day
      const hoursAgo = Math.floor(timeDifference / 3600000);
      timeAgo = `${hoursAgo} hours ago`;
    } else {
      // More than 1 day
      const daysAgo = Math.floor(timeDifference / 86400000);
      timeAgo = `${daysAgo} days ago`;
    }

    setHoursAgo(timeAgo);
  }, [props.discussion.postingTime]);

  useEffect(() => {
    fetchProfileFromServer(localStorage.getItem("user"))
      .then((res) => {
        console.log(res);
        if (props.discussion.upvotes.includes(res._id)) {
          console.log("upvoted");
          setUpvoted(true);
        } else {
          console.log("not upvoted");
          setUpvoted(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleUpvote = () => {
    putUpvote(props.discussion._id)
      .then((res) => {
        console.log(res);
        setUpvotes(res.data.upvotes.length);
        setUpvoted(!upvoted);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleTextAreaChange = (e) => {
    setComment(e.target.value);
    var element = e.target;
    element.style.overflow = "hidden";
    element.style.height = 0;
    element.style.height = element.scrollHeight + "px";
  };

  const handleSubmit = () => {
    postComment(props.discussion._id, comment)
      .then((res) => {
        console.log(res);
        setComments((comments) => comments + 1);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(comment);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setSubmit(false);
    }, 200);
  };


  return (
    <div className="w-full text-black p-5 rounded-lg bg-white mb-2 drop-shadow-lg max-w-[50rem] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 md:gap-2 gap-1">
        <div className="md:col-span-1 md:mr-auto items-center flex">
          <div className="bg-[#CCC] mx-auto md:max-w-[50px] md:max-h-[50px] md:w-[3.5vw] md:h-[3.5vw] md:min-w-[32px] md:min-h-[32px] h-[45px] w-[45px] shadow rounded-full relative"></div>
        </div>
        <div className="md:col-span-8 flex flex-col md:items-start md:justify-center items-center">
          <div className="flex gap-2">
            <div className="text-[1rem] font-semibold">
              {props.discussion.poster && props.discussion.poster.name}
            </div>
            <div className="flex items-center">
              <img
                src="images/verify.png"
                alt="Description"
                className="object-cover object-center w-[1.125rem] h-[1.125rem]"
              />
            </div>
          </div>
          <div className="text-[0.75rem] text-[#0016DA] align-bottom">
            @{props.discussion.poster && props.discussion.poster.email}
          </div>
        </div>
        <div className="md:col-span-3 flex flex-col items-end align-top">
          <div className="text-[0.875rem] text-[#0016DA]">{hoursAgo}</div>
        </div>
        <div className="md:col-span-1"></div>
        <div className="md:col-span-8 hover:cusor-pointer" onClick={() => { window.location.href = `/discussionView?id=${props.discussion._id}`; }}>
          <div className="text-[1rem]">{props.discussion.content}</div>
        </div>
        <div className="flex justify-end md:col-span-3 items-center"></div>
        <div className="md:col-span-1"></div>
        <div className="md:col-span-8">
          <div className="flex flex-col gap-1 items-end text-black ml-[-0.5rem] mt-[1rem]">
            <textarea
              onChange={handleTextAreaChange}
              onFocus={() => {
                setSubmit(true);
              }}
              onBlur={handleBlur}
              rows={1}
              type="text"
              placeholder="Answer Here"
              className="overflow-hidden shadow py-[0.375rem] bg-[#E5E5E5] text-black
                            placeholder:font-semibold p-3 rounded-2xl w-[100%] focus:border-[#0016DA] focus:outline-none 
                            focus:border resize-none"
            />
            <div className={`${submit ? "block" : "hidden"}`}>
              <button
                className="bg-[#0016DA] shadow ml-auto text-white text-[12px] font-bold rounded-lg px-4 py-1"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="md:col-span-3"></div>
        <div className="md:col-span-1"></div>
        <div className="md:col-span-8"></div>
        <div className="md:col-span-3 flex justify-end">
          <div className="flex w-fit h-fit gap-4 justify-end text-black align-center items-center py-0.5 px-2 rounded-full border-[1px] border-white">
            <div className="flex gap-1 align-center items-center">
              <img
                src={"images/comment.svg"}
                alt="Description"
                className="object-cover object-center w-[0.98rem] h-[0.98rem]"
              />
              <div className="text-[0.875rem]">{comments}</div>
            </div>
            <div className="flex gap-1 align-center items-center">
              <img
                src={`images/${upvoted ? "upvote" : "emptyUpvote"}.svg`}
                alt="Description"
                className="object-cover object-center w-[0.875rem] h-[0.875rem]"
                onClick={handleUpvote}
              />
              <div className="text-[0.875rem]">{upvotes}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DiscussionUnit };
