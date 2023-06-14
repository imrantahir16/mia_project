import axios from "../../api/axios";

const API_URL = "api/report/";

// create Report
const createReport = async (reportData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, reportData, config);

  return response.data;
};

// get Reports
const getAllReports = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  console.log(response);

  return response.data;
};

const deleteReport = async (reportId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + reportId, config);

  return response.data;
};

const updateReport = async (reportId, reportData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + reportId, reportData, config);
  console.log(response);
  return response.data;
};

const reportService = {
  createReport,
  getAllReports,
  deleteReport,
  updateReport,
};

export default reportService;
