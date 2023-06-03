import axios from "../../api/axios";

const API_URL = "api/emergency/";

// create Emergency
const createEmergency = async (emergencyData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, emergencyData, config);

  return response.data;
};

// get emergencies
const getEmergencies = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const deleteEmergency = async (emergencyId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + emergencyId, config);

  return response.data;
};

const updateEmergency = async (emergencyId, emergencyData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + emergencyId,
    emergencyData,
    config
  );
  console.log(response);
  return response.data;
};

const emergencyService = {
  createEmergency,
  getEmergencies,
  deleteEmergency,
  updateEmergency,
};

export default emergencyService;
