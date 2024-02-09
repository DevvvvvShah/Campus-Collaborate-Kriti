import axios from "axios";

const getCourseReview = (courseReviewId) => {
    return axios.get(`http://localhost:3001/coursereview/${courseReviewId}`,
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

const postComment = (courseId, content) => {
    if(localStorage.getItem('lastCommentTime') && Date.now() - localStorage.getItem('lastCommentTime') < 60000){
        return new Promise((resolve,reject) => {
            resolve({data: {message: 'Please wait a few seconds before commenting again.'}});
        });
    }
    localStorage.setItem('lastCommentTime',Date.now());
    return axios.post(`http://localhost:3001/coursereview/comment`, {courseId, content},
    {
      withCredentials: true,
    });
}

const toggleEnroll = (courseId) => {
    return axios.put(`http://localhost:3001/coursereview/enroll`, {courseId},
    {
      withCredentials: true,
    });
}

export { getCourseReview, getAllCourseReviews, postComment,toggleEnroll };