import axios from 'axios';

const getProjects = () => {
    return axios.get('http://localhost:3001/projects/');
    };

export {
    getProjects,
};
