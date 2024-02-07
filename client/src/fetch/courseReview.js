import axios from "axios";

const getCourseReview = (courseId) => {
    return axios.get(`http://localhost:3001/coursereview/${courseId}`,
    {
      withCredentials: true,
    });
}

const getAllCourseReviews = () => {
    return axios.get(`http://localhost:3001/coursereview/`,
    {
      withCredentials: true,
    });
}

export { getCourseReview, getAllCourseReviews };