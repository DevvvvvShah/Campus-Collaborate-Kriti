import axios from 'axios';

const getDiscussions = () => {
  return axios.get('http://localhost:3001/discussion/'); 
};

const postComment = (discussionId, content) => {
  return axios.post('http://localhost:3001/discussion/comment', {
    discussionId,
    content,
  },
  {
    withCredentials: true,
  });
};


export {
  getDiscussions,
  postComment,
};
