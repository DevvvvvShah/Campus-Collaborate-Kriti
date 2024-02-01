import axios from 'axios';

const getDiscussions = () => {
  return axios.get('http://localhost:3000/discussion/'); 
};



export default getDiscussions;
