import axios from "axios";
import { API_BASE_URL, VEHICLES_ENDPOINT } from "../constants/api";
import type { Vehicle } from "../types/Vehicle";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});


export const createVehicle = (data: Partial<Vehicle>) => {  return api.post(VEHICLES_ENDPOINT, data);
};

export const updateVehicle = (id: number | string, data: Partial<Vehicle>) => {
  return api.put(`${VEHICLES_ENDPOINT}/${id}`, data);
};

export const deleteVehicle = (id: number | string) => {
  return api.delete(`${VEHICLES_ENDPOINT}/${id}`);
};