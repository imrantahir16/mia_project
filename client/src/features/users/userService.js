import axios from "../../api/axios";

const API_URL = "/api/users/";

// get user goals
const getAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/all`, config);

  return response.data;
};

const deleteUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + userId, config);

  return response.data;
};

const userService = {
  getAllUsers,
  deleteUser,
};

export default userService;
