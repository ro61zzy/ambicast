const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL

export async function analyzeTrees(
  imageUri: string
) {
  const formData = new FormData();

  formData.append(
    "image",
    {
      uri: imageUri,
      name: "analysis.jpg",
      type: "image/jpeg",
    } as any
  );

  const response = await fetch(
    `${BASE_URL}/v1/trees/analyze`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_WEATHER_API_KEY}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const text = await response.text();

    throw new Error(
      text || "Failed to analyze image"
    );
  }

  return response.json();
}