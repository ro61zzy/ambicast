const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export function analyzeTrees(imageUri: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    const fileType = imageUri.split('.').pop() || 'png';

    // React Native's legacy bridge interceptor works flawlessly with XHR
    formData.append("image", {
      uri: imageUri,
      name: `farm.${fileType}`,
      type: `image/${fileType}`,
    } as any);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${BASE_URL}/v1/trees/analyze`);
    // Set headers
    xhr.setRequestHeader("Authorization", `Bearer ${process.env.EXPO_PUBLIC_WEATHER_API_KEY}`);
    xhr.setRequestHeader("Accept", "application/json");

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch (e) {
          resolve(xhr.responseText);
        }
      } else {
        reject(new Error(xhr.responseText || `Server responded with status ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error("Network request failed"));
    xhr.send(formData);
  });
}