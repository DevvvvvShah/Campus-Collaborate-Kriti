import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Topbar from "../components/Navbar/Topbar";
import Project from "../components/Projects/MainProject";
import { getProjects } from "../fetch/projects";
import AddProject from "../components/Projects/addProject";
import { Link } from "react-router-dom";

function Projects() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isAddProject, setIsAddProject] = useState(false);

  useEffect(() => {
    getProjects()
      .then((res) => {
        setProjects(res.data);
        setFilteredProjects(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
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
        <Project projects={filteredProjects} />
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
