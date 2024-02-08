import { useState } from "react";
import React, { useEffect } from "react";
import CourseReviewComp from "../components/CourseReview/CourseReviewComp";
import DialogBox from "../components/CourseReview/Dialogue";
import Topbar from "../components/Navbar/Topbar";
import Navbar from '../components/Navbar/Navbar';
import { getAllCourseReviews } from "../fetch/courseReview";
import AddCourse from "../components/CourseReview/addCourse";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { getTechStacks } from "../fetch/techStacks";


// import { useLocation } from 'react-router-dom';
// import { MainDiscussion } from '../components/DiscussionForum/MainDiscussion'
// import getDiscussions from '../fetch/discussions'
// import Topbar from '../components/Navbar/topbar';
// import topbar from './topbar';

const CourseReview = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [courseReviews, setCourseReviews] = useState([]);
  const [filteredCourseReviews, setFilteredCourseReviews] = useState([]);
  const [filteredFilteredCourseReviews, setFilteredFilteredCourseReviews] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [unit, setUnit] = useState([]);
  const [isAddCourse, setIsAddCourse] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [techStacks, setTechStacks] = useState([]);
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);


  useEffect(() => {
    getAllCourseReviews().then((res) => {
      setCourseReviews(res.data);
      setFilteredCourseReviews(res.data);
      setFilteredFilteredCourseReviews(res.data);
    }
    ).catch((error) => {
      console.error(error);
    }
    );
    getTechStacks().then((res) => {
      setTechStacks(res.data.map((value, index) => (
        { id: value._id , title: value.name }
      )));
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
    for(let i=0;i<filteredFilteredCourseReviews.length;i++){
      setUnit((prev) => [...prev,(<CourseReviewComp courseReview={filteredFilteredCourseReviews[i]} />)])
    }
  },[filteredFilteredCourseReviews])

  const dialogMessage = {
    title: 'Instruction',
    body: 'Explore and share your thoughts on an existing course! If it\'s not there, simply click \'Add New Course\' to start the conversation.',
  };

  const handleTechStacksChange = (event, value) => {
    setSelectedTechStacks(value);
  }

  useEffect(() => {
    let temp = [...filteredFilteredCourseReviews];
    if (selectedOption === "enrolled") {
      temp.sort((a, b) => b.enrolledStudents.length - a.enrolledStudents.length);
    } else if (selectedOption === "views") {
      temp.sort((a, b) => b.views - a.views);
    } else if (selectedOption === "comments") {
      temp.sort((a, b) => b.commentsId.length - a.commentsId.length);
    }
    else{
      temp.sort((a, b) => new Date(b.timeOfPost) - new Date(a.timeOfPost));
    }
    setFilteredFilteredCourseReviews(temp);
  }, [selectedOption,filteredCourseReviews]);

  useEffect(() => {
    let temp = [...filteredCourseReviews];
    if(selectedTechStacks.length > 0){
      temp = temp.filter((courseReview) => {
        let flag = false;
        selectedTechStacks.forEach((techStack) => {
          if(courseReview.techStacks.includes(techStack.id)){
            flag = true;
          }
        });
        return flag;
      });
    }
    setFilteredFilteredCourseReviews(temp);
  }, [selectedTechStacks, filteredCourseReviews]);

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
      <Topbar title = "Course Review" courseReviews={courseReviews} setFilteredCourseReviews={setFilteredCourseReviews} />
      <select className="ml-[400px]" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
            <option value="">Sort By</option>
            <option value="enrolled">No. of Enrolled Students</option>
            <option value="views">Views</option>
            <option value="comments">No. of Comments</option>
        </select>
        <Autocomplete
          className='mt-4 ml-[400px]'
          multiple
          options={techStacks}
          getOptionLabel={(option) => option.title}
          value={selectedTechStacks}
          onChange={handleTechStacksChange}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip label={option.title} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="TechStacks Used" placeholder="Select TechStacks" size="small" />
          )}
        />
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
