import React from 'react';
import Topbar from '../components/Navbar/Topbar';
import HeaderCard from '../components/ProjectView/HeaderCard';
import CommentCard from '../components/ProjectView/CommentCard';
import { useEffect, useRef, useState } from 'react';
import { getProject } from '../fetch/projects';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function ProjectView() {
    const [project, setProject] = useState({});

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const encodedData = urlParams.get('id');
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

    // Sample image and video URLs
    const mediaUrls = [
        '/images/demoPic.png',
        '/images/demoVid.mkv'
        // Add more URLs as needed
    ];



  return (
    <div className="w-screen flex flex-col justify-center items-center">
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
        <Slider {...settings}>
          {mediaUrls.map((url, index) => (
            <div className="flex justify-center w-fit">
              {url.endsWith(".png") ? (
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
      </div>
      <div className="flex flex-col gap-2 w-[80vw] mt-[20vh] pl-[2vw]">
        <div className="text-[1.5rem] text-[#0016DA] font-bold">
          Tech Stacks
        </div>
        <div>
          <div>
            {project.techStacks && project.techStacks.map((techStack, index) => (
            <span className="inline-block mr-8 border rounded-lg px-2 bg-white shadow-sm" key={index}>{techStack}</span>
            ))}
            </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-[80vw] mt-[10vh] pl-[2vw]">
        <div className="text-[1.5rem] text-[#0016DA] font-bold mb-[3vh]">
          Comments
        </div>
        <div>
          {project.commentsId && project.commentsId.map((comment, index) => (
            <CommentCard key={index} comments={comment} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectView;
