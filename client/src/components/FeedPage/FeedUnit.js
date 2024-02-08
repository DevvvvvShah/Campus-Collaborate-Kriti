import React, { useEffect } from "react";
import axios from "axios";
import fetchProfileFromServer from "../../fetch/profile";
import { postComment, postFavorite, putLike } from "../../fetch/feed";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import CommentCard from "./CommentCard";
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';


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
  const [commentCount, setCommentCount] = React.useState(0);
  const [isAddComment, setIsAddComment] = React.useState(false);

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

  console.log(props.post)

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
    setCommentCount(5);
  };

  const handleCommentButtonHide = () => {
    setIsCommenting(false);
  };

  const handleCommentAdd = () => {
    setCommentCount(commentCount + 5);
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

  const handleAddComment = () => {
    postComment(props.post._id, comment).then((res) => {
      console.log("Comment Posted:  ", res);
      window.location.reload();
    });
  };

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
    <div className="flex flex-col w-[40vw] min-h-[32rem] rounded-xl bg-white text-gray-700 shadow-md mb-[1rem] ml-[20vw]">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <img
            src={props.post.creator && (props.post.creator.profilePic || '/images/defaultThumbnail.jpeg')}
            alt="Profile"
            className="w-[2rem] h-[2rem] rounded-full"
          />
          <div className="text-[1rem] font-semibold">
            {props.post.creator && props.post.creator.name}
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

      {props.post.mediaArray && props.post.mediaArray.length!==0 ? 
          <Slider {...settings}>
          {props.post.mediaArray.map((url, index) => (
            <div className="flex min-h-[15rem] justify-center w-fit">
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
      </div>
      <div className="p-3">
        <p className="font-semibold">{likes} likes</p>
        <p>
          {/* <span className="font-semibold">{profile && profile.name}</span> */}
          {props.post.caption}
        </p>
        { !isCommenting ?
        <button className="text-gray-500" onClick={handleCommentButtonClick}>View all {comments} comments</button>
        :
        <div>
        <button className="text-gray-500" onClick={handleCommentButtonHide}>Hide all comments</button>
        <div className="flex flex-col gap-2 w-full mt-[1vh] pl-[2vw]">
          <div className="text-[1rem] font-bold mb-[3vh]"
                onClick = {() => setIsAddComment(!isAddComment)}>
            Add Comment {isAddComment ? '▲' : '▼'}
          </div>
          <div className={`flex flex-col ml-[1vw] mr-[3vw] ${isAddComment ? 'block' : 'hidden'}`}>
            <TextField
              label="Add comment here"
              variant="outlined"
              className='w-full'
              multiline
              rows={4}
              size="small"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              margin="normal"
            />
            <Button variant="contained" className="w-full" onClick={handleAddComment} style={{ backgroundColor: '#0016DA'}}>Submit</Button>

          </div>
        </div>         
        {(props.post.comments && props.post.comments.length!==0) ? 
        <div>
          {props.post.comments.map((comment, index) => {
            if (index < commentCount) {
              return (
                <CommentCard key={index} comments={comment} />
              )
            }
          })}
        <button className="text-gray-500" onClick={handleCommentAdd}>View More</button>
        </div>
          :null}
        </div>
        }
      </div>
      <div className="text-[0.875rem] text-[#0016DA] px-[1rem]">{hoursAgo}</div>
    </div>
  );
};

export { FeedUnit };
