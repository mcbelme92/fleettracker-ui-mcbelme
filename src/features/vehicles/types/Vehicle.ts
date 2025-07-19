export interface Vehicle {
  id: number;
  licensePlate: string;
  make: string;
  model: string;
  year: number;
  status: string;
  location: { lat: number; lng: number };
  lastService: string;
  odometer: number;
  gpsActive: boolean;
}
