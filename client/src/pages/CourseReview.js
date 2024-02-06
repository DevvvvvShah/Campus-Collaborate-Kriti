import { useState } from "react";
import React, { useEffect } from "react";
import CourseReviewComp from "../components/CourseReview/CourseReviewComp";
import DialogBox from "../components/CourseReview/Dialogue";
import Topbar from "../components/Navbar/Topbar";
import Navbar from '../components/Navbar/Navbar';


// import { useLocation } from 'react-router-dom';
// import { MainDiscussion } from '../components/DiscussionForum/MainDiscussion'
// import getDiscussions from '../fetch/discussions'
// import Topbar from '../components/Navbar/topbar';
// import topbar from './topbar';

const CourseReview = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const dialogMessage = {
    title: 'Instruction',
    body: 'Explore and share your thoughts on an existing course! If it\'s not there, simply click \'Add New Course\' to start the conversation.',
  };
return (
  <div className='relative flex flex-col md:flex-row bg-[#F8F8F8] w-screen min-h-[100vh]'>
    <Navbar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
    <div className='w-full'>
      <Topbar />
      <div className='md:ml-[27vw] pl-[10%] pr-[10%] pt-16 md:pl-[3%] md:pr-[10%] '>
         <DialogBox
      isOpen={isDialogOpen}
      onClose={closeDialog}
      message={dialogMessage}
    />
      <div className='text-white font-bold z-50 fixed flex justify-center shadow items-center bottom-2 right-2 w-[200px] h-[60px] bg-[#bcc2f7] rounded-full hover:scale-105 transition-all duration-300'>
          <button onClick={openDialog}><h1>+ Add a course review</h1></button>
      </div>
        <CourseReviewComp/>
      </div>
    </div>
    
  </div>);
};

export default CourseReview;
