import axios from 'axios';

const getProjects = () => {
    return axios.get('http://localhost:3001/projects/');
    };

const getProject = (id) => {
    return axios.get(`http://localhost:3001/projects/${id}`);
};

const addCollab = (id,user) => {
    return axios.put(`http://localhost:3001/projects/${id}/addCollab`,{
        user
    },
    {
        withCredentials: true,
    });
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

const postComment = (id,content) => {
    if(localStorage.getItem('lastCommentTime') && Date.now() - localStorage.getItem('lastCommentTime') < 60000){
        return new Promise((resolve,reject) => {
            resolve({data: {message: 'Please wait a few seconds before commenting again.'}});
        });
    }
    localStorage.setItem('lastCommentTime',Date.now());
    return axios.post('http://localhost:3001/projects/comment/',{
        projectId: id,
        content: content,
    },
    {
        withCredentials: true,
    })
}


export {
    getProjects,
    getProject,
    putLike,
    putDislike,
    postComment,
    addCollab
};
