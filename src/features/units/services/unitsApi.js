import { apiClient } from "../../../lib/apiClient";

export const getUnits = async () => {
  const res = await apiClient.get("/units");
  return res.data;
};

export const getUnitById = async (id) => {
  const res = await apiClient.get(`/units/${id}`);
  return res.data;
};