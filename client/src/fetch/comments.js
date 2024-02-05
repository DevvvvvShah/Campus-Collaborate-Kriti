import axios from "axios";

const putUpvote = (commentId) => {
    return axios.put(`http://localhost:3001/comment/like/${commentId}`,
    {},
    {
      withCredentials: true,
    });
  };

export { putUpvote };