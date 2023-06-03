import axios from "../../api/axios";

const API_URL = "api/mechanic/";

// create Mechanic
const createMechanic = async (mechanicData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, mechanicData, config);

  return response.data;
};

// get user mechanics
const getMechanics = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const deleteMechanic = async (mechanicId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + mechanicId, config);

  return response.data;
};

const updateMechanic = async (mechanicId, mechanicData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + mechanicId, mechanicData, config);
  console.log(response);
  return response.data;
};

const mechanicService = {
  createMechanic,
  getMechanics,
  deleteMechanic,
  updateMechanic,
};

export default mechanicService;
