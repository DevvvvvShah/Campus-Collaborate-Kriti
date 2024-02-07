import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollMagic from 'scrollmagic';


function LandingPageComp() {
  const handleSignIn = async () => {
    console.log("clicked");
    window.location.href = "http://localhost:3001/auth/signin";
  };

  useEffect(() => {
    const controller = new ScrollMagic.Controller(); // Initialize the ScrollMagic controller

    new ScrollMagic.Scene({
      triggerElement: ".thirdElement",
      triggerHook: 0.5,
    })
      .setClassToggle(".thirdElement", "fade-in")
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: ".secondElement",
      triggerHook: 0.1,
      reverse: false,
    })
      .setClassToggle(".secondElement", "fade-in")
      .addTo(controller);
  }, []);
 
     
    
  return (
    <div className="flex flex-col items-center justify-between">
      <div className="h-[50vh] mt-[25vh] ml-16 flex justify-between m-auto">
        <div className="flex flex-1 flex-col w-[60vw] justify-center items-center gap-[20px]">
          <h1 className="text-[48px]">
            A New Way To <span className="text-[#4942E4]">Connect</span>
          </h1>
          <p className="text-[16px] text-[#00000]">
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
        <div className="h-[50vh] w-[40vw]">
          <div className= "flex items-center h-full">
            <img
              className="w-[55%] object-contain m-auto"
              src="/cdf.jpg"
              alt="logo"
            />
          </div>
        </div>
      </div>
        {/*Part 2*/}
      <div className="h-[110vh] z-0 pl-16 flex justify-between bg-[#0016DA22] secondElement">
          <div className="flex flex-1 flex-col w-[60vw] justify-center items-center gap-[20px]">
            <h1 className="text-[48px]">
              A New Way To <span className="text-[#4942E4]">Connect</span>
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
              className="w-[55%] object-contain m-auto"
              src="/cdf.jpg"
              alt="logo"
            />
        </div>   
      </div> 
        {/*Part 3*/}
      <div className="h-[100vh] z-0 pl-16 flex justify-between thirdElement">
        <div className="flex flex-1 flex-col w-[60vw] justify-center items-center gap-[20px]">
          <h1 className="text-[48px]">
            A New Way To <span className="text-[#4942E4]">Connect</span>
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
            className="w-[55%] object-contain m-auto"
            src="/cdf.jpg"
            alt="logo"
          />
        </div>   
      </div>           
    </div>
  );
}

export default LandingPageComp;
