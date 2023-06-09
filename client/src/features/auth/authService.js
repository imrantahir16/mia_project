import axios from "../../api/axios";

const API_URL = "api/auth/";

// register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data.user.roles.hasOwnProperty("Admin")) {
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } else {
    return response.data;
  }

  // console.log(response);
};

const logout = async () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
