import axios from 'axios';

const fetchProfileFromServer = async (profileId) => {
    try {
        const response = await axios.get(`http://localhost:3000/profile/${profileId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
};

export default fetchProfileFromServer;
