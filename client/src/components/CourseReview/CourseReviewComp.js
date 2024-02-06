import image from "../../assets/ok.png";
import Upvote from "../../assets/upvote.svg";
import Downvote from "../../assets/downvote.svg";


const CourseReviewComp = (props) => {
    const courseReview = props.courseReview;
    const coursePic = courseReview.coursePic;
    return ( 
        <div className="flex items-center justify-center w-fit mt-5 mb-5 rounded-3xl  bg-white hover:scale-[1.03] transition-all duration-300">
              <div className="w-1/4">
                <img src={coursePic || image} alt="course pic" className="py-9 mx-7" />
              </div>
              <div className="w-3/4 my-2 mx-10" >
                <div>
                <h1 style={{ fontWeight: "bold", fontSize: "24px", paddingBottom: "10px" }}>
                  {courseReview.title}
                </h1>
                <p>
                  {courseReview.description}
                </p>
                <div className="flex justify-end">
                    <div className="bg-[#e4e3e3] h-[2.5rem] w-[6rem] flex justify-evenly items-center rounded-[50px]">
                    <button>
                        <img src={Upvote} alt="img" className="h-[1.5rem]"/>
                    </button>
                    <div className="bg-white w-[0.2rem] h-[2.5rem]"> </div>
                    <button>
                        <img src={Downvote} alt="img" className="h-[1.5rem]"/>
                    </button>
                    </div>
                </div>
              </div>
            </div>
            </div>
     );
}
 
export default CourseReviewComp;