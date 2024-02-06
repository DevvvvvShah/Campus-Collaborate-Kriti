import axios from 'axios';

const getPosts = () => {
  return axios.get('http://localhost:3001/posts/'); 
};

const getMyConnectionPosts = () => {
  return axios.get('http://localhost:3001/posts/myconnectionposts', {
    withCredentials: true,
  });
}

const getFavorites = () => {
  return axios.get('http://localhost:3001/posts/myfavposts', {
    withCredentials: true,
  });
}

const postComment = (postId, content) => {
  return axios.post('http://localhost:3001/posts/comment', {
    postId,
    content,
  },
  {
    withCredentials: true,
  });
};

const postFavorite = (postId) => {
  return axios.post('http://localhost:3001/posts/myfavposts', {
    postId,
  },
  {
    withCredentials: true,
  });
};

const putLike = (postId) => {
  return axios.put('http://localhost:3001/posts/likes', {
    postId,
  },
  {
    withCredentials: true,
  });
};


export {
  getPosts,
  postComment,
  putLike,
  postFavorite,
  getMyConnectionPosts,
  getFavorites
};
