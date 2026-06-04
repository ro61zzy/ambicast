const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export async function getUsage() {
  const response = await fetch(
    `${BASE_URL}/v1/usage`,
    {
      headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_WEATHER_API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load usage");
  }

  return response.json();
}