import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FullpageContainer,
  FullpageSection,
} from '@shinyongjun/react-fullpage';
import '@shinyongjun/react-fullpage/css';

const LandingPageComp = () => {
  const handleSignIn = async () => {
    console.log("clicked");
    window.location.href = "http://localhost:3001/auth/signin";
  };  
  const fullPageOptions = {
    scrollSensitivity: 5,
    touchSensitivity: 5,
    scrollSpeed: 5000,
    hideScrollBars: true,
    enableArrowKeys: true,
  };
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <FullpageContainer
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
      onBeforeChange={(beforeIndex, afterIndex) => {
        console.log('before', beforeIndex, afterIndex);
      }}
      onAfterChange={(beforeIndex, afterIndex) => {
        console.log('after', beforeIndex, afterIndex);
      }}      
    >
      <FullpageSection>
        <div  id = "section1" >
        <div className="h-[100vh] z-0 pl-16 flex justify-between bg-gradient-to-br from-cyan-500/75 to-blue-500/75">
            <div className="flex flex-1 flex-col px-[6vw] w-[60vw] justify-center items-center gap-[20px]">
              <h1 className="text-[48px]">
                A New Way To <span className="text-[#00FF00]">Connect</span>
              </h1>
              <p className="text-[16px] text-[#000000]">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis
                sunt maiores a sit. Architecto et asperiores voluptas natus ut
                ducimus.
              </p>
              <div className="button flex items-center justify-center gap-3 bg-[#4942E4] text-[white] font-medium w-[120px] p-[10px] border-none rounded-lg cursor-pointer">
                <Link onClick={handleSignIn}>
                  <span>Sign In</span>
                </Link>
              </div>
            </div>
            <div className=" h-[100vh] w-[40vw] flex items-center h-full">
              <img
                className="w-[55%] object-contain my-auto mr-auto"
                src="/cdf.jpg"
                alt="logo"
              />
          </div>   
        </div>
        </div>
      </FullpageSection>
      <FullpageSection>
      <div  id = "section2" >
      <div className="h-[100vh] z-0 pr-16 text-black flex justify-between bg-gradient-to-tl from-gray-900/80 to-gray-500/70">
      <div className=" h-[100vh] w-[30vw] flex items-center h-full">
            <img
              className="w-[75%] object-contain m-auto"
              src="/cdf.jpg"
              alt="logo"
            />
        </div>   
          <div className="flex flex-1 flex-col px-[6vw] w-[70vw] justify-center items-center gap-[20px]">
            <h1 className="text-[48px]">
              A New Way To <span className="text-[#FFFFFF]">Projects</span>
            </h1>
            <p className="text-[16px]">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis
              sunt maiores a sit. Architecto et asperiores voluptas natus ut
              ducimus.
            </p>
            <div className="button flex items-center justify-center gap-3 bg-[#4942E4] text-[white] font-medium w-[120px] p-[10px] border-none rounded-lg cursor-pointer">
              <Link onClick={handleSignIn}>
                <span>Sign In</span>
              </Link>
            </div>
          </div>
      </div> 
      </div>
      </FullpageSection>
      <FullpageSection>
      <div  id = "section3" >

      <div className="h-[100vh] z-0 flex flex-col text-white justify-between bg-gradient-to-tl from-orange-600/80 to-yellow-400/80 secondElement">
        <div className=" w-[100vw] h-[60vh] flex flex-col">
            <img
              className="h-[65%] object-contain my-auto ml-auto px-[6vw]"
              src="/cdf.jpg"
              alt="logo"
            />
        </div>           
          <div className="flex flex-1 flex-col px-[6vw] h-[40vh] w-[50vw] justify-start items-center gap-[20px]">
            <h1 className="text-[48px]">
              A New Way To <span className="text-[#000000]">Discuss</span>
            </h1>
            <p className="text-[16px]">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis
              sunt maiores a sit. Architecto et asperiores voluptas natus ut
              ducimus.
            </p>
          </div>
      </div> 
      </div>
      </FullpageSection>
      <FullpageSection>
      <div  id = "section4" >
      <div className="h-[100vh] z-0 flex flex-col text-white justify-between bg-gradient-to-tl from-violet-600/90 to-indigo-500/75 secondElement">
          <div className=" w-[100vw] h-[60vh] flex items-center">
            <img
              className="h-[65%] object-contain m-auto"
              src="/cdf.jpg"
              alt="logo"
            />
          </div> 
          <div className="flex flex-1 flex-col px-[6vw] w-[70vw] mx-auto h-[40vh] justify-start items-center gap-[20px]">
            <h1 className="text-[48px]">
              A New Way To <span className="text-[#FFFF00]">Review Course</span>
            </h1>
            <p className="text-[16px] text-center">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis
              sunt maiores a sit. Architecto et asperiores voluptas natus ut
              ducimus.
            </p>
          </div>  
      </div> 
      </div>
      </FullpageSection>      
      <FullpageSection isAutoHeight>
        <footer>Footer</footer>
      </FullpageSection>
    </FullpageContainer>
  );
};

export default LandingPageComp;
