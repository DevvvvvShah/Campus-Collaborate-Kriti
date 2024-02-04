import axios from 'axios';

const fetchProfileFromServer = async (profileId) => {
    axios.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem('token')}`;
    try {
        console.log('fetching profile');
        const response = await axios.get(`http://localhost:3001/profile/${profileId}`,
            { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
};

export default fetchProfileFromServer;
