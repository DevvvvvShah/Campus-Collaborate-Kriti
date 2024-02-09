import React, { useEffect } from "react";
import { fetchProfileFromServer } from "../../fetch/profile";
import { postComment, putUpvote } from "../../fetch/discussions";
import { Link } from "react-router-dom";

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
    setUpvotes(props.discussion.upvotes.length);
    setComments(props.discussion.comments.length);
    setUpvoted(props.discussion.upvotes.includes(localStorage.getItem("user")));
  }, [props.discussion]);

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
        if (res.data.message) {
          alert(res.data.message);
          return;
        }
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
    <div className="w-full h-[14rem] text-black rounded-lg bg-white mb-2 drop-shadow-lg  mx-auto">
      <div className="flex md:flex-row md:p-3 md:pl-[2rem] pl-[1rem] mt-[1rem] md:mt-[1rem] flex-wrap">
        <div className="flex gap-12">
          <Link
            to={`/profile/${
              props.discussion.poster && props.discussion.poster._id
            }`}
            className="flex items-center gap-2"
          >
            <div className="flex">
              <div className="flex md:ml-auto">
                <img
                  src={
                    props.discussion.poster
                      ? props.discussion.poster.profilePic ||
                        "/images/defaultThumbnail.jpeg"
                      : "/images/defaultThumbnail.jpeg"
                  }
                  alt="Profile"
                  className="w-[2.5rem] md:w-[3rem] h-[2.5rem] md:h-[3rem] rounded-full"
                />
              </div>
            </div>
          </Link>
          <div className="flex flex-col md:items-start md:justify-center md:ml-[1rem] ml-[0.1rem] items-center md:w-[39rem] w-[10rem]">
            <div className="flex gap-2  ml-[-6rem] ">
              <Link
                to={`/profile/${
                  props.discussion.poster && props.discussion.poster._id
                }`}
                className="flex items-center gap-2"
              >
                <div className="md:text-[1rem] text-[0.8rem] font-semibold">
                  {props.discussion.poster && props.discussion.poster.name}
                </div>
              </Link>
              <div className="flex items-center">
                <img
                  src="images/verify.png"
                  alt="Description"
                  className="object-cover object-center w-[1.125rem] h-[1.125rem]"
                />
              </div>
            </div>
            <Link
              to={`/profile/${
                props.discussion.poster && props.discussion.poster._id
              }`}
              className="flex items-center gap-2"
            >
              <div className="text-[0.75rem] ml-[-6rem] md:pl-0 text-[#0016DA]">
                @{props.discussion.poster && props.discussion.poster.email}
              </div>
            </Link>
          </div>
        </div>
        <div className="flex md:col-span-3 flex-col align-top">
          <div className="text-[0.875rem] text-[#0016DA]">{hoursAgo}</div>
        </div>
      </div>
      <div
        className="w-full md:w-2/3 mt-[1rem] pl-1 hover:cusor-pointer"
        onClick={() => {
          window.location.href = `/discussionView?id=${props.discussion._id}`;
        }}
      >
        <div className="text-[1rem] md:pl-[4rem] pl-[1rem]">
          {props.discussion.content}
        </div>
      </div>
      <div
        className="flex justify-end md:col-span-3 items-center"
        onClick={() => {
          window.location.href = `/discussionView?id=${props.discussion._id}`;
        }}
      ></div>
      <div className="w-full md:w-2/3 flex  gap-1 text-black px-2 pt-[3rem]">
        <textarea
          onChange={handleTextAreaChange}
          onFocus={() => {
            setSubmit(true);
          }}
          onBlur={handleBlur}
          rows={1}
          type="text"
          placeholder="Answer Here"
          className="overflow-hidden  shadow py-[0.375rem] bg-[#E5E5E5] text-black
                            placeholder:font-semibold p-3 rounded-2xl w-[150%] focus:border-[#0016DA] focus:outline-none 
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
      <div
        className="md:col-span-3"
        onClick={() => {
          window.location.href = `/discussionView?id=${props.discussion._id}`;
        }}
      ></div>
      <div
        className="md:col-span-1"
        onClick={() => {
          window.location.href = `/discussionView?id=${props.discussion._id}`;
        }}
      ></div>
      <div
        className="md:col-span-8"
        onClick={() => {
          window.location.href = `/discussionView?id=${props.discussion._id}`;
        }}
      ></div>
      <div className="w-full md:w-1/4 flex h-fit gap-4 md:mt-[3rem] justify-end text-black align-center items-center py-0.5 px-2 rounded-full border-[1px] border-white">
        <div
          className="flex gap-1 items-center"
          onClick={() => {
            window.location.href = `/discussionView?id=${props.discussion._id}`;
          }}
        >
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
  );
};

export { DiscussionUnit };
