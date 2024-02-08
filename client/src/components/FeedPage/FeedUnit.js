import React, { useEffect } from "react";
import axios from "axios";
import fetchProfileFromServer from "../../fetch/profile";
import { postComment, postFavorite, putLike } from "../../fetch/feed";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const FeedUnit = (props) => {
  const [hoursAgo, setHoursAgo] = React.useState("");
  const [profile, setProfile] = React.useState({});
  const [isCommenting, setIsCommenting] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [submit, setSubmit] = React.useState(false);
  const [comments, setComments] = React.useState(props.post.comments.length);
  const [likes, setLikes] = React.useState(props.post.likes.length);
  const [liked, setLiked] = React.useState(false);
  const [isFavorited, setFavorited] = React.useState(false);

  useEffect(() => {
    const postingTime = props.post.timeOfCreation;
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
  }, [props.post.timeOfCreation]);

  useEffect(() => {
    fetchProfileFromServer(localStorage.getItem("user"))
      .then((res) => {
        console.log(res);
        if (props.post.likes.includes(res._id)) {
          console.log("liked");
          setLiked(true);
        } else {
          console.log("not liked");
          setLiked(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleLike = () => {
    putLike(props.post._id)
      .then((res) => {
        console.log(res);
        setLikes(res.data.likes.length);
        setLiked(!liked);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCommentButtonClick = () => {
    setIsCommenting(true);
  };

  const handleTextAreaChange = (e) => {
    setComment(e.target.value);
    var element = e.target;
    element.style.overflow = "hidden";
    element.style.height = 0;
    element.style.height = element.scrollHeight + "px";
  };

  const handleSubmit = () => {
    postComment(props.post._id, comment)
      .then((res) => {
        setComments((comments) => comments + 1);
        setComment("");
        setIsCommenting(false);
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

  const handleFavorite = async () => {
    postFavorite(props.post._id)
      .then((res) => {
        console.log(res);
        setFavorited(!isFavorited);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchProfileFromServer(props.post.creator)
      .then((res) => {
        setProfile(res);
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

    function NextArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{
              ...style,
              display: "flex",
              background: "darkgray",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "1.5px",
              borderRadius: "50%",
          }}
          onClick={onClick}
        />
      );
    }
    
  function PrevArrow(props) {
      const { className, style, onClick } = props;
      return (
          <div
              className={className}
              style={{
                  ...style,
                  display: "flex",
                  background: "darkgray",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: "1.5px",
                  borderRadius: "50%",
              }}
              onClick={onClick}
          />
      );
  };

  const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,     
  };  

  return (
    <div className="flex flex-col w-[40vw] h-[32rem] rounded-xl bg-white text-gray-700 shadow-md mb-[1rem] ml-[20vw]">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <img
            src={profile && profile.profilePic}
            alt="Profile"
            className="w-[2rem] h-[2rem] rounded-full"
          />
          <div className="text-[1rem] font-semibold">
            {profile && profile.name}
          </div>
          <div className="flex items-center">
            <img
              src="images/verify.png"
              alt="Description"
              className="object-cover object-center w-[1.125rem] h-[1.125rem]"
            />
          </div>
        </div>
        <button>...</button>
      </div>

      {props.post.thumbnail && props.post.thumbnail.length!==0 ? 
          <Slider {...settings}>
          {props.post.thumbnail.map((url, index) => (
            <div className="flex h-[15rem] justify-center w-fit">
              {(url.endsWith(".png") || url.endsWith(".jpg") || url.endsWith(".jpeg") || url.endsWith(".svg")) ? (
                <img
                  src={url}
                  alt={`Image ${index + 1}`}
                  className="slider-image"
                />
              ) : (
                <video controls>
                  <source src={url} type="video/mp4" />
                </video>
              )}
            </div>
          ))}
        </Slider> : <div className="h-[20rem]"></div>
        }

      <div className="flex items-center justify-between p-3">
        <div className="flex gap-4">
          <button onClick={handleLike}>
            <img
              src={`/${liked ? "emptyHeart" : "heart"}.svg`}
              alt="Like"
              className="w-[1.5rem] h-[1.5rem]"
            />
          </button>
          <button onClick={handleCommentButtonClick}>
            <img
              src="/comment.svg"
              alt="Comment"
              className="w-[1.5rem] h-[1.5rem]"
            />
          </button>
        </div>
        <button onClick={handleFavorite}>
          <img
            src={`/${isFavorited ? "Filledfavorite" : "favorite"}.svg`}
            alt="Favorite"
            className="w-[1.5rem] h-[1.5rem]"
          />
        </button>
      </div>
      <div className="md:col-span-8">
        <div className="flex flex-col gap-1 items-end text-black ml-[-0.5rem] mt-[1rem]">
          <div className={`${isCommenting ? "block" : "hidden"}`}>
            <textarea
              onChange={handleTextAreaChange}
              onFocus={() => {
                setSubmit(true);
              }}
              onBlur={handleBlur}
              rows={1}
              cols={80}
              type="text"
              placeholder="Answer Here"
              value={comment}
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
      </div>
      <div className="p-3">
        <p className="font-semibold">{likes} likes</p>
        <p>
          {/* <span className="font-semibold">{profile && profile.name}</span> */}
          {props.post.caption}
        </p>
        <button className="text-gray-500">View all {comments} comments</button>
      </div>
      <div className="text-[0.875rem] text-[#0016DA] px-[1rem]">{hoursAgo}</div>
    </div>
  );
};

export { FeedUnit };
