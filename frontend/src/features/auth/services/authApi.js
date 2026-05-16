import axios from "axios";

const API = "http://localhost:8080/api/auth";

export const login = async (data) => {
  const res = await axios.post(`${API}/login`, data);

  localStorage.setItem("token", res.data.token);

  return res.data;
};

export const register = async (data) => {
  return axios.post(`${API}/register`, data);
};