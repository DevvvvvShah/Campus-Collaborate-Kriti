import { useState } from "react";

// const DiscussionForum = () => {
//     const [isOpen, setIsOpen] = useState(false);

//     const togglePage = () => {
//         setIsOpen(!isOpen);
//     };

//     return (
//         <div>
//             <button onClick={togglePage}>Toggle Page</button>
//             {isOpen && (
//                 <div className="sliding-page">
//                     {/* Your page content goes here */}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default DiscussionForum;

import React, { useEffect } from "react";
import CourseReviewComp from "../components/CourseReview/CourseReviewComp";


// import { useLocation } from 'react-router-dom';
// import { MainDiscussion } from '../components/DiscussionForum/MainDiscussion'
// import getDiscussions from '../fetch/discussions'
// import Navbar from '../components/Navbar/navbar';
// import Topbar from '../components/Navbar/topbar';
// import topbar from './topbar';

const CourseReview = () => {
  // const [isExpanded, setIsExpanded] = React.useState(true);
  // const [discussions, setDiscussions] = React.useState([]);

  // useEffect(() => {
  //     getDiscussions().then((res) => {
  //         setDiscussions(res.data);
  //         console.log(res.data);
  //     }).catch(error => {
  //         console.error(error);
  //     });
  // }, []);

  const [isExpanded, setIsExpanded] = useState(false);

  const togglePage = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div className={`page ${isExpanded ? "expanded" : ""}`}>
        <div className="relative flex flex-col md:flex-row bg-[#e4e3e3] w-full min-h-[100vh]">


          <div className="flex flex-col w-full">
           <CourseReviewComp />
           <CourseReviewComp />
           <CourseReviewComp />
           <CourseReviewComp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseReview;
