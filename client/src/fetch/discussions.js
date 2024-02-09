import axios from 'axios';

const getDiscussions = () => {
  return axios.get('http://localhost:3001/discussion/'); 
};

const getDiscussion = (id) => {
  return axios.get(`http://localhost:3001/discussion/${id}`);
};

const postComment = (discussionId, content) => {
  if(localStorage.getItem('lastCommentTime') && Date.now() - localStorage.getItem('lastCommentTime') < 60000){
    return new Promise((resolve,reject) => {
        resolve({data: {message: 'Please wait a few seconds before commenting again.'}});
    });
}
localStorage.setItem('lastCommentTime',Date.now());
  return axios.post('http://localhost:3001/discussion/comment', {
    discussionId,
    content,
  },
  {
    withCredentials: true,
  });
};

const putUpvote = (discussionId) => {
  return axios.put('http://localhost:3001/discussion/upvote', {
    discussionId,
  },
  {
    withCredentials: true,
  });
};

const putDownvote = (discussionId) => {
  return axios.put('http://localhost:3001/discussion/downvote', {
    discussionId,
  },
  {
    withCredentials: true,
  });
}

const postDiscussion = (body) => {
  console.log(body);
  return axios.post('http://localhost:3001/discussion/', body, {
    withCredentials: true,
  });
}


export {
  getDiscussions,
  postComment,
  putUpvote,
  postDiscussion,
  getDiscussion,
  putDownvote,
};
