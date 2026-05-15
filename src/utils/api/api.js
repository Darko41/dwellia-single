import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// =====================
// AUTH TOKEN HANDLING
// =====================
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// =====================
// GLOBAL ERROR HANDLING
// =====================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response?.data || error.message);

    if (error.response?.status === 401) {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("user");

      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

// =====================
// API LAYERS (SIMPLIFIED)
// =====================
const API = {
  // =====================
  // AUTH
  // =====================
  auth: {
    login: (data) => api.post("/api/auth/authenticate", data),
    register: (data) => api.post("/api/users/register", data),
    me: () => api.get("/api/auth/me"),
    logout: () => api.post("/api/auth/logout"),
  },

  // =====================
  // USERS (MINIMAL)
  // =====================
  users: {
    getCurrent: () => api.get("/api/users/me"),
    update: (id, data) => api.put(`/api/users/${id}`, data),
  },

  // =====================
  // REAL ESTATES (MAIN FEATURE)
  // =====================
  realEstates: {
    // public
    search: (params) =>
      api.get("/api/real-estates/search", { params }),

    getById: (id) =>
      api.get(`/api/real-estates/${id}`),

    getFeatured: (limit = 10) =>
      api.get("/api/real-estates/featured/active", {
        params: { limit },
      }),

    // user actions
    create: (formData) =>
      api.post("/api/real-estates", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),

    update: (id, data) =>
      api.put(`/api/real-estates/${id}`, data),

    delete: (id) =>
      api.delete(`/api/real-estates/${id}`),

    myProperties: () =>
      api.get("/api/real-estates/my-properties"),
  },

  // =====================
  // AGENCY (SINGLE AGENCY SUPPORT)
  // =====================
  agencies: {
    getAll: () => api.get("/api/agencies"),
    getById: (id) => api.get(`/api/agencies/${id}`),
    myAgency: () => api.get("/api/agencies/my-agency"),
  },

  // =====================
  // UPLOAD (IMAGES)
  // =====================
  upload: {
    single: (formData) =>
      api.post("/api/upload/single", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),

    multiple: (formData) =>
      api.post("/api/upload/multiple", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
  },

  // =====================
  // CONTACT / EMAIL
  // =====================
  email: {
    contact: (data) =>
      api.post("/api/email/contact", data),
  },
};

export const axiosInstance = api;
export default API;