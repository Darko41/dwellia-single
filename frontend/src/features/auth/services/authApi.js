import axios from "axios";

const API = "http://localhost:8080/api/auth";

/**
 * LOGIN
 * returns JWT only (no side effects here anymore)
 */
export const loginRequest = async (data) => {
  const res = await axios.post(`${API}/login`, data);
  return res.data; // { token: "..." }
};

/**
 * REGISTER
 */
export const registerRequest = async (data) => {
  const res = await axios.post(`${API}/register`, data);
  return res.data;
};