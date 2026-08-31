import { axiosInstance } from "@/shared/api/client";

export const getUnits = async () => {
  const res = await axiosInstance.get("/api/units");
  return res.data;
};

export const getUnitById = async (id) => {
  const res = await axiosInstance.get(`/api/units/${id}`);
  return res.data;
};