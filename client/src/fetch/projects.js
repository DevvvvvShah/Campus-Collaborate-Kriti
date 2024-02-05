import axios from 'axios';

const getProjects = () => {
    return axios.get('http://localhost:3001/projects/');
    };

const getProject = (id) => {
    return axios.get(`http://localhost:3001/projects/${id}`);
};


export {
    getProjects,
    getProject,
};
