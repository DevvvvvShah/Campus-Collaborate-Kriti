import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function LandingPageComp() {
  const handleSignIn = async () => {
    console.log("clicked");
    window.location.href = "http://localhost:3001/auth/signin";
  };

  return (
    <div className="h-[100vh] flex- flex-col items-center justify-between">
      <div className="h-[100%] w-[1200px] flex justify-between m-auto">
        <div className="flex flex-1 flex-col justify-center items-center gap-[20px]">
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
        <div className=" w-[550px] relative">
          <img
            className="mix-blend-screen w-[55%] object-contain absolute top-0 left-0 right-0 bottom-0 m-auto"
            src="/cdf.jpg"
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
}

export default LandingPageComp;
