import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// JWT interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // IMPORTANT: unified key

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Global error handler
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);