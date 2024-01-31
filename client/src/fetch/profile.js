import axios from 'axios';

const fetchProfileFromServer = async (profileId) => {
    try {
        const response = await axios.get(`/api/profiles/${profileId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
};

export default fetchProfileFromServer;
