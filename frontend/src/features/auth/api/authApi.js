import { axiosInstance } from "@/shared/api/client";

export const loginRequest = async (data) => {
  const res = await axiosInstance.post("/api/auth/login", data);
  return res.data;
};

export const registerRequest = async (data) => {
  const res = await axiosInstance.post("/api/auth/register", data);
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await axiosInstance.get("/api/auth/me");
  return res.data;
};