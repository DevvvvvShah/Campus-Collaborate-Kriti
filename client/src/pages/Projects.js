import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Topbar from "../components/Navbar/Topbar";
import Project from "../components/Projects/MainProject";
import { getProjects } from "../fetch/projects";
import AddProject from "../components/Projects/addProject";
import { Link } from "react-router-dom";
import { getTechStacks } from "../fetch/techStacks";
import { Autocomplete, Chip, TextField } from "@mui/material";

function Projects() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filteredFilteredProjects, setFilteredFilteredProjects] = useState([]);
  const [isAddProject, setIsAddProject] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [techStacks, setTechStacks] = useState([]);
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);

  useEffect(() => {
    getProjects()
      .then((res) => {
        res.data.sort((a, b) => new Date(b.timeOfPost) - new Date(a.timeOfPost));
        setProjects(res.data);
        setFilteredProjects(res.data);
        setFilteredFilteredProjects(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
    getTechStacks()
      .then((res) => {
        const formattedTechStacks = res.data.map((value, index) => (
          { id: value._id , title: value.name }
        ));
        setTechStacks(formattedTechStacks);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    let temp = [...filteredFilteredProjects];
    if (selectedOption === "likes") {
      temp.sort((a, b) => b.likes.length - a.likes.length);
    } else if (selectedOption === "views") {
      temp.sort((a, b) => b.views - a.views);
    } else if (selectedOption === "comments") {
      temp.sort((a, b) => b.commentsId.length - a.commentsId.length);
    }
    else if(selectedOption === "rating"){
      temp.sort((a, b) => b.rating - a.rating);
    }
    else{
      temp.sort((a, b) => new Date(b.timeOfPost) - new Date(a.timeOfPost));
    }
    setFilteredFilteredProjects(temp);
  }, [selectedOption,filteredProjects]);

  useEffect(() => {
    let temp = [...filteredProjects];
    if(selectedTechStacks.length > 0){
      temp = temp.filter((project) => {
        console.log(project.techStacks);
        let flag = false;
        selectedTechStacks.forEach((techStack) => {
          if(project.techStacks.includes(techStack.id)){
            flag = true;
          }
        });
        return flag;
      });
    }
    setFilteredFilteredProjects(temp);
  }, [selectedTechStacks]);

  const handleTechStacksChange = (event, value) => {
    setSelectedTechStacks(value);
  };

  return (
    <div className="relative flex flex-col md:flex-row bg-[#F8F8F8] w-screen min-h-[100vh]">
      <Navbar
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        select={{ projects: true }}
      />
      <div className={`flex justify-center rounded-xl items-center z-50 
      w-screen h-screen bg-[#00000022] fixed top-0 left-0
      ${isAddProject ? ' block' : ' hidden'}`}>
        <AddProject setIsAddProject={setIsAddProject}/>
      </div>
      <div className="w-screen">
        <Topbar title="Projects" projects={projects} setFilteredProjects={setFilteredProjects}/>
        <select className="ml-[400px]" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
            <option value="">Sort By</option>
            <option value="likes">Likes</option>
            <option value="views">Views</option>
            <option value="comments">No. of Comments</option>
            <option value="rating">Rating</option>
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
        
        <Project projects={filteredFilteredProjects} />
      </div>
      <div
        className="fixed flex justify-center shadow-lg items-center gap-2 md:bottom-2 md:right-2 bottom-[9vh] right-2
                     w-[180px] h-[45px] bg-[#FFFFFF] rounded-full "
        onClick={() => setIsAddProject(true)}
      >
        <img
          src="images/add.svg"
          alt="add"
          className={`w-[50%] h-[50%] md:w-fit md:h-[65%] object-contain`}
        />
        <div className="text-[#0016DA] text-[0.875rem] font-semibold">
          Add a Project
        </div>
      </div>
    </div>
  );
}

export default Projects;
