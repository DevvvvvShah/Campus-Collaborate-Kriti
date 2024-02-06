import axios from 'axios';

const getProjects = () => {
    return axios.get('http://localhost:3001/projects/');
    };

const getProject = (id) => {
    return axios.get(`http://localhost:3001/projects/${id}`);
};

const putLike = (id) => {
    return axios.put(`http://localhost:3001/projects/likes/`,{
        projectId: id,
    },
    {
        withCredentials: true,
    });
};

const putDislike = (id) => {
    return axios.put(`http://localhost:3001/projects/dislikes/`,{
        projectId: id,
    },
    {
        withCredentials: true,
    });
}


export {
    getProjects,
    getProject,
    putLike,
    putDislike,
};
