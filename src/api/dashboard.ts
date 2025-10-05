import { Summary } from "../utils/types";
import api from "./api";

export const getSummary = async (): Promise<Summary> => {
  const res = await api.get(`/dashboard/summary`);
  return res.data;
}