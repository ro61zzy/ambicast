const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

export async function getWeather(lat: number, lon: number) {
  const response = await fetch(
    `https://api.weather-ai.co/v1/weather?lat=${lat}&lon=${lon}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather");
  }

  return response.json();
}