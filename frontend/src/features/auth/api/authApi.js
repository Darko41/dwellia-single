import { axiosInstance } from "@/shared/api/client";

export const loginRequest = async (data) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};

export const registerRequest = async (data) => {
  const res = await axiosInstance.post("/auth/register", data);
  return res.data;
};