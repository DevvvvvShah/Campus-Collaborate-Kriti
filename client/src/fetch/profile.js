import axios from "axios";

const fetchProfileFromServer = async (profileId) => {
  axios.defaults.headers.common[
    "authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
  try {
    console.log("fetching profile");
    const response = await axios.get(
      `http://localhost:3001/profile/${profileId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

const fetchOtherUserProfile = async (profileId) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/profile/${profileId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

const addConnection = (userId) => {
  return axios.put(
    `http://localhost:3001/profile/${userId}/addConnection`,
    {
      userId,
    },
    {
      withCredentials: true,
    }
  );
};

const addtoPortfolio = (projectId) => {
  return axios.put(
    "http://localhost:3001/profile/addtoPortfolio",
    { project: projectId }, // Correctly passing the data here
    {
      withCredentials: true,
    }
  );
};

const removeConnection = (userId) => {
  return axios.put(
    `http://localhost:3001/profile/${userId}/removeConnection`,
    {
      userId,
    },
    {
      withCredentials: true,
    }
  );
};

export {
  fetchProfileFromServer,
  removeConnection,
  fetchOtherUserProfile,
  addConnection,
  addtoPortfolio,
};
