import { useState } from "react";
import React, { useEffect } from "react";
import CourseReviewComp from "../components/CourseReview/CourseReviewComp";
import DialogBox from "../components/CourseReview/Dialogue";
import Topbar from "../components/Navbar/Topbar";
import Navbar from '../components/Navbar/Navbar';
import { getAllCourseReviews } from "../fetch/courseReview";
import AddCourse from "../components/CourseReview/addCourse";


// import { useLocation } from 'react-router-dom';
// import { MainDiscussion } from '../components/DiscussionForum/MainDiscussion'
// import getDiscussions from '../fetch/discussions'
// import Topbar from '../components/Navbar/topbar';
// import topbar from './topbar';

const CourseReview = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [courseReviews, setCourseReviews] = useState([]);
  const [filteredCourseReviews, setFilteredCourseReviews] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [unit, setUnit] = useState([]);
  const [isAddCourse, setIsAddCourse] = useState(false);


  useEffect(() => {
    getAllCourseReviews().then((res) => {
      setCourseReviews(res.data);
      setFilteredCourseReviews(res.data);
    }
    ).catch((error) => {
      console.error(error);
    }
    );
  }, []);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    setUnit([])
    for(let i=0;i<filteredCourseReviews.length;i++){
      setUnit((prev) => [...prev,(<CourseReviewComp courseReview={filteredCourseReviews[i]} />)])
    }
  },[filteredCourseReviews])

  const dialogMessage = {
    title: 'Instruction',
    body: 'Explore and share your thoughts on an existing course! If it\'s not there, simply click \'Add New Course\' to start the conversation.',
  };
return (
  <div className='relative flex flex-col md:flex-row bg-[#F8F8F8] w-screen min-h-[100vh]'>
    <Navbar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
    <div
      className="fixed z-20 flex justify-center shadow-lg items-center gap-2 md:bottom-2 md:right-2 bottom-[9vh] right-2
                    w-[180px] h-[45px] bg-[#FFFFFF] rounded-full "
      onClick = {() => setIsAddCourse(true)}
    >
      <img
        src="images/add.svg"
        alt="add"
        className={`w-[50%] h-[50%] md:w-fit md:h-[65%] object-contain`}
      />
      <div className="text-[#0016DA] text-[0.875rem] font-semibold">
        Add Review
      </div>
    </div>    
    <div className={`flex justify-center rounded-xl items-center z-50 
      w-screen h-screen bg-[#00000022] fixed top-0 left-0
      ${isAddCourse ? ' block' : ' hidden'}`}>
        <AddCourse setIsAddCourse={setIsAddCourse}/>
      </div>
    <div className='w-full'>
      <Topbar courseReviews={courseReviews} setFilteredCourseReviews={setFilteredCourseReviews} />
      <div className='md:ml-[27vw] pl-[10%] pr-[10%] pt-16 md:pl-[3%] md:pr-[10%] '>
         <DialogBox
      isOpen={isDialogOpen}
      onClose={closeDialog}
      message={dialogMessage}
    />
        {unit}
      </div>
    </div>
    
  </div>);
};

export default CourseReview;
