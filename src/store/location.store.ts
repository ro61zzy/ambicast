import { create } from "zustand";

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  city: string;
  setLocation: (
    latitude: number,
    longitude: number,
    city?: string
  ) => void;
}

export const useLocationStore = create<LocationState>(
  (set) => ({
    latitude: null,
    longitude: null,
    city: "Unknown",

    setLocation: (
      latitude,
      longitude,
      city = "Unknown"
    ) =>
      set({
        latitude,
        longitude,
        city,
      }),
  })
);