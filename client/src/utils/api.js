import axios from "axios";

const CREDENTIALS = {
  withCredentials: true,
};

export const getAuthStatus = () =>
  axios.get("http://localhost:8080/api/auth/status", CREDENTIALS);
