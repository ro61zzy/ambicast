import * as Location from "expo-location";

export async function getCurrentLocation() {
  const { status } =
    await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    throw new Error("Permission denied");
  }

  const location =
    await Location.getCurrentPositionAsync({});

  const address =
    await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    city:
      address[0]?.city ||
      address[0]?.district ||
      "Unknown",
  };
}