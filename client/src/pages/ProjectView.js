import React from 'react';
import Topbar from '../components/Navbar/Topbar';
import HeaderCard from '../components/ProjectView/HeaderCard';
import CommentCard from '../components/ProjectView/CommentCard';
import { useEffect, useRef, useState } from 'react';
import { getProject,postComment } from '../fetch/projects';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';

function ProjectView() {
    const [project, setProject] = useState({});
    const [comment,setComment] = useState('');
    const [isAddComment, setIsAddComment] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const encodedData = urlParams.get('id');
        if (!encodedData) {
          window.location.href = '/404';
        }        
        getProject(encodedData).then((response) => {
            setProject(response.data);
        }).catch((error) => {
            console.error('Error fetching project:', error);
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
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />        
    };

    const handleAddComment = () => {
      postComment(project._id, comment).then((res) => {
        console.log('Comment Posted:  ', res);
        window.location.reload();
      });
    };

  return (
    <div className="w-screen flex flex-col justify-center items-center mb-[10vh]">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Topbar title="Project" />
      </div>
      <HeaderCard project={project}/>
      <div className="flex flex-col gap-2 w-[80vw] mt-[20vh] pl-[2vw]">
        <div className="text-[1.5rem] text-[#0016DA] font-bold">
          Description
        </div>
        <div className="">
          <div className="text-[#000000] text-[1rem] mt-2">
            {project.description}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-[80vw] mt-[10vh] pl-[2vw]">
        <div className="text-[1.5rem] text-[#0016DA] font-bold">
          Project Showcase
        </div>
        {project.mediaArray && project.mediaArray.length!==0 ? 
          <Slider {...settings}>
          {project.mediaArray.map((url, index) => (
            <div className="flex justify-center w-fit">
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
        </Slider> 
        : 
        <div className="text-[#000000] text-[1rem] mt-2">No media to display</div>}

      </div>
      <div className="flex flex-col gap-2 w-[80vw] mt-[10vh] pl-[2vw]">
        <div className="text-[1.5rem] text-[#0016DA] font-bold">
          Tech Stacks
        </div>
        <div>
          <div>
            {(project.techStacks && project.techStacks.length!==0) ? project.techStacks.map((techStack, index) => (
            <span className="inline-block mr-8 border rounded-lg px-2 bg-white shadow-sm" key={index}>{techStack.name}</span>
            ))
            :
            <span className="inline-block mr-8 border rounded-lg px-2 bg-white shadow-sm">NONE</span>}
            </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-[80vw] mt-[10vh] pl-[2vw]">
        <div className="text-[1.5rem] text-[#0016DA] font-bold">
          Comments
        </div>
        <div className="flex flex-col gap-2 w-[80vw] mt-[1vh] pl-[2vw]">
          <div className="text-[1rem] font-bold mb-[3vh]"
                onClick = {() => setIsAddComment(!isAddComment)}>
            Add Comment {isAddComment ? '▲' : '▼'}
          </div>
          <div className={`flex flex-col ml-[2vw] ${isAddComment ? 'block' : 'hidden'}`}>
            <TextField
              label="Add comment here"
              variant="outlined"
              className='w-[70vw]'
              multiline
              rows={4}
              size="small"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              margin="normal"
            />
          <Button variant="contained" onClick={handleAddComment} style={{ backgroundColor: '#0016DA',width:'70vw  ' }}>Submit</Button>

          </div>
        </div>        
        <div>
          {(project.commentsId && project.commentsId.length!==0) ? project.commentsId.map((comment, index) => (
            <CommentCard key={index} comments={comment} />
          )):
          <div className="text-[#000000] text-[1rem] mt-2">
            No comments yet
          </div>}
        </div>
      </div>
    </div>
  );
}

export default ProjectView;
