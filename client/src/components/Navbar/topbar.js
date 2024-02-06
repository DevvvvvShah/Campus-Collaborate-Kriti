import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Topbar = (props) => {
  const discussions = props.discussions;
  const courseReviews = props.courseReviews;
  const posts = props.posts;
  const [search, setSearch] = React.useState("");

  const navigate = useNavigate();

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
      if(discussions){
        const filteredDiscussions = discussions.filter((discussion) => discussion.content.toLowerCase().includes(search.toLowerCase()));
        console.log(filteredDiscussions);
        props.setFilteredDiscussions(filteredDiscussions);
      }
      if(courseReviews){
        const filteredCourseReviews = courseReviews.filter((courseReview) => courseReview.course.toLowerCase().includes(search.toLowerCase()));
        props.setFilteredCourseReviews(filteredCourseReviews);
      }
      if(posts){
        const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));
        props.setFilteredPosts(filteredPosts);
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
          <div className="profile bg-[#CCC] mr-[5vw] ml-[2vw] w-[30px] h-[30px] shadow rounded-full"></div>
        </div>
        <button onClick={handleLogout} className=" py-1 px-2 mr-2 rounded bg-blue-500 text-white">Logout</button>
      </div>
    </div>
  );
};

export default Topbar;
