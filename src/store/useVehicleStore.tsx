import { create } from "zustand";
import type { Vehicle } from "../types/Vehicle";

interface VehicleState {
  vehicles: Vehicle[];
  totalVehicles: number;
  page: number;
  limit: number;
  selectedVehicle: Vehicle | null;
  searchQuery: string;
  statusFilter: string;
  shouldRefresh: boolean; 
  setVehicles: (vehicles: Vehicle[]) => void;
  setTotalVehicles: (total: number) => void;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: string) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setShouldRefresh: (refresh: boolean) => void; 
}

export const useVehicleStore = create<VehicleState>((set) => ({
  page: 1,
  limit: 10,
  vehicles: [],
  totalVehicles: 0,
  selectedVehicle: null,
  searchQuery: "",
  statusFilter: "",
  shouldRefresh: false,
  setVehicles: (vehicles) => set({ vehicles }),
  setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
  setTotalVehicles: (total: number) => set({ totalVehicles: total }),
  setShouldRefresh: (refresh) => set({ shouldRefresh: refresh })
}));
