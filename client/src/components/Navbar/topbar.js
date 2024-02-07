import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchProfileFromServer from "../../fetch/profile";

const Topbar = (props) => {
  const discussions = props.discussions;
  const courseReviews = props.courseReviews;
  const postSearch = props.postSearch;
  const projects = props.projects;
  const [search, setSearch] = React.useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem('user');
    if (userFromLocalStorage) {
      fetchProfileFromServer(userFromLocalStorage)
        .then((res) => setUser(res))
        .catch((err) => console.log(err));
    }
    console.log('This is the user as per topbar', userFromLocalStorage);
  }, []);
  console.log(user);

  const handleMouseEnter = () => {
    setShowDetails(true);
  };

  const handleMouseLeave = () => {
    setShowDetails(false);
  };

    const handleLogout = () => {
      localStorage.removeItem("user");
      console.log("Logout button clicked");

      // Redirect to home page
      navigate("/");
    };
  const handleSearch = () => {
    console.log("Search button clicked");
    if (window.innerWidth < 768) {
      const search = document.querySelector("input");
      search.classList.toggle("hidden");
      const topic = document.querySelector(".topic");
      const profile = document.querySelector(".profile");
      const searchIcon = document.querySelector(".icon");
      if (search.classList.contains("hidden")) {
        topic.classList.remove("hidden");
        profile.classList.remove("hidden");
        searchIcon.classList.remove("absolute");
        search.classList.remove("w-[90vw]");
      } else {
        topic.classList.add("hidden");
        profile.classList.add("hidden");
        searchIcon.classList.add("absolute");
        search.classList.add("w-[90vw]");
      }
    }
  };

  useEffect(() => {
    if(search){
      if(discussions && props.setFilteredDiscussions){
        const filteredDiscussions = discussions.filter((discussion) => discussion.content.toLowerCase().includes(search.toLowerCase())||discussion.title.toLowerCase().includes(search.toLowerCase()));
        console.log(filteredDiscussions);
        props.setFilteredDiscussions(filteredDiscussions);
      }
      if(courseReviews && props.setFilteredCourseReviews){
        const filteredCourseReviews = courseReviews.filter((courseReview) => courseReview.title.toLowerCase().includes(search.toLowerCase())||courseReview.description.toLowerCase().includes(search.toLowerCase()));
        console.log(filteredCourseReviews);
        props.setFilteredCourseReviews(filteredCourseReviews);
      }
      if(projects && props.setFilteredProjects){
        const filteredProjects = projects.filter((project) => project.title.toLowerCase().includes(search.toLowerCase())||project.description.toLowerCase().includes(search.toLowerCase()));
        props.setFilteredProjects(filteredProjects);
      } 
      if(props.setPostSearch){
        props.setPostSearch(search);
        console.log(search);
      }
    }
    else{
      if (discussions){
        props.setFilteredDiscussions(discussions);
      }
      if(courseReviews){
        props.setFilteredCourseReviews(courseReviews);
      }
      if(projects){
        props.setFilteredProjects(projects);
      }
      if(postSearch){
        props.setPostSearch("");
      }

    }
  }, [search]);

  return (
    <div className="w-screen bg-white drop-shadow-md">
      <div className="md:ml-[25vw] ml-[5vw] flex items-center py-[1.5vh] align-center justify-between">
        <div className="topic md:text-xl md:text-lg h-fit pl-[2vw]">
          {props.title}
        </div>
        <div className="flex items-center">
          <div className="relative min-w-[2rem] md:max-w-[20rem]">
            <img
              src="images/search.svg"
              alt="Description"
              className="icon md:absolute left-3 top-2 object-cover object-center w-[1rem] h-[1.05rem] hover:cursor-pointer"
              onClick={handleSearch}
            />
            <input
              type="text"
              className="bg-[#EEE] rounded-full md:block hidden px-8 py-1 focus:outline-none"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            {user && (
              <div>
                <img
                  src={user.profilePic}
                  alt="Profile"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="profile mr-[1vw] ml-[5vw] w-[30px] h-[30px] rounded-full"
                />
                <p
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {user.name}
                </p>
              </div>
            )}

            {showDetails && user && (
              <div className="dialog-box">
                <p>Name: {user.name}</p>
                <p>Program: {user.program}</p>
                <p>Branch: {user.branch}</p>
                <p>Email: {user.email}</p>
              </div>
            )}
          </div>
        </div>
        <button onClick={handleLogout} className=" py-1 px-2 mr-2 rounded bg-blue-500 text-white">Logout</button>
      </div>
    </div>
  );
};

export default Topbar;
