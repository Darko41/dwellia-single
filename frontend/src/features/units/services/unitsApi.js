import { axiosInstance } from "../../../utils/api/api";

export const getUnits = async () => {
  const res = await axiosInstance.get("/units");
  return res.data;
};

export const getUnitById = async (id) => {
  const res = await axiosInstance.get(`/units/${id}`);
  return res.data;
};

export const createUnit = async (data) => {
  const res = await axiosInstance.post("/units", data);
  return res.data;
};