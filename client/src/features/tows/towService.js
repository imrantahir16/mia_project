import axios from "../../api/axios";

const API_URL = "/api/tows/";

// create Tow
const createTow = async (towData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, towData, config);

  return response.data;
};

// get user goals
const getTows = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const deleteTow = async (towId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + towId, config);

  return response.data;
};

const towService = {
  createTow,
  getTows,
  deleteTow,
};

export default towService;
