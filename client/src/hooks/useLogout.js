import axios from "../api/axios";
import { LOGOUT_URL } from "../utils/apiEndpoints";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      const response = await axios.get(LOGOUT_URL, {
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return logout;
};
export default useLogout;
