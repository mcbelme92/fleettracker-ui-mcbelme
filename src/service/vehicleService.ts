import axios from "axios";
import type { Vehicle } from "../types/Vehicle";


const api = axios.create({
  baseURL: "http://localhost:3001", // ajusta si tu puerto es distinto
});

// GET con paginación opcional
export const getVehicles = async (page = 1, limit = 10): Promise<Vehicle[]> => {
  const response = await api.get<Vehicle[]>(`/vehicles`, {
    params: {
      _page: page,
      _limit: limit,
    },
  });
  return response.data;
};
