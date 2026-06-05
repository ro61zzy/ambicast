import { create } from "zustand";
import { WeatherResponse } from "@/types/weather";

type WeatherStore = {
  weather: WeatherResponse | null;

  fetchedAt: number | null;

  setWeather: (
    weather: WeatherResponse
  ) => void;

  isFresh: () => boolean;
};

export const useWeatherStore =
  create<WeatherStore>((set, get) => ({
    weather: null,
    fetchedAt: null,

    setWeather: (weather) =>
      set({
        weather,
        fetchedAt: Date.now(),
      }),

    isFresh: () => {
      const fetchedAt =
        get().fetchedAt;

      if (!fetchedAt) return false;

      const THIRTY_MINUTES =
        30 * 60 * 1000;

      return (
        Date.now() - fetchedAt <
        THIRTY_MINUTES
      );
    },
  }));