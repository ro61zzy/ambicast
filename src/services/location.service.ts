import * as Location from "expo-location";

export async function getCurrentLocation() {
  const { status } =
    await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    throw new Error("Permission denied");
  }

  const location =
    await Location.getCurrentPositionAsync({});

 const address = await Location.reverseGeocodeAsync({
  latitude: location.coords.latitude,
  longitude: location.coords.longitude,
});

const place = address[0];

const city =
  place?.city ||
  place?.subregion ||
  place?.region ||
  "Unknown";

return {
  latitude: location.coords.latitude,
  longitude: location.coords.longitude,
  city,
};
}