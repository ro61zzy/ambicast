import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LOCATIONS } from "@/constants/locations";
import { getWeather } from "@/services/weather";
import { WeatherResponse } from "@/types/weather";

const BG = "#06111F";
const CARD = "#0B1A2C";
const ACCENT = "#2EE6C5";

export default function InsightsScreen() {
  const [selectedCity, setSelectedCity] =
    useState(LOCATIONS[0]);

  const [weather, setWeather] =
    useState<WeatherResponse | null>(null);

  const [loading, setLoading] =
    useState(false);

  async function loadWeather(
    lat: number,
    lon: number
  ) {
    try {
      setLoading(true);

      const data =
        await getWeather(lat, lon);

      setWeather(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWeather(
      selectedCity.lat,
      selectedCity.lon
    );
  }, [selectedCity]);

  const bestDay =
    weather?.daily?.reduce(
      (best, current) => {
        const bestScore =
          best.temp_max -
          best.precipitation_probability;

        const currentScore =
          current.temp_max -
          current.precipitation_probability;

        return currentScore > bestScore
          ? current
          : best;
      }
    );

const now = new Date();

const upcomingHours =
  weather?.hourly
    ?.filter((hour) => {
      return new Date(hour.time) >= now;
    })
    .slice(0, 12) ?? [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        <Text style={styles.title}>
          Insights
        </Text>

        <Text style={styles.subtitle}>
          Explore weather around the world
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
          style={{
            marginTop: 20,
            marginBottom: 24,
          }}
        >
          {LOCATIONS.map((city) => (
            <Pressable
              key={city.name}
              style={[
                styles.cityChip,
                selectedCity.name ===
                  city.name &&
                  styles.activeChip,
              ]}
              onPress={() =>
                setSelectedCity(city)
              }
            >
              <Text
                style={[
                  styles.cityText,
                  selectedCity.name ===
                    city.name &&
                    styles.activeText,
                ]}
              >
                {city.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {loading ? (
          <ActivityIndicator
            color={ACCENT}
            size="large"
          />
        ) : (
          <>
          {weather && bestDay && (
        <View style={styles.heroCard}>
  <Text style={styles.heroCity}>
    {selectedCity.name}
  </Text>

  <View style={styles.heroRow}>
    <View>
      <Text style={styles.heroTemp}>
        {weather?.current?.temperature}°
      </Text>

      <Text style={styles.heroLabel}>
        Current
      </Text>
    </View>

    <View style={styles.bestDayContainer}>
      <Text style={styles.bestDayName}>
        {new Date(
          bestDay.date
        ).toLocaleDateString("en-US", {
          weekday: "long",
        })}
      </Text>

      <Text style={styles.bestDayTemp}>
        {bestDay.temp_max}°
      </Text>

      <Text style={styles.bestDayMeta}>
        {bestDay.precipitation_probability}%
        {" "}Rain
      </Text>
    </View>
  </View>
</View>
)}
<Text style={styles.sectionTitle}>
  Hourly Outlook
</Text>

<ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
>
  {upcomingHours.map((hour) => (
    <View
      key={hour.time}
      style={styles.hourCard}
    >
      <Text style={styles.hourTime}>
        {new Date(
          hour.time
        ).toLocaleTimeString([], {
          hour: "numeric",
        })}
      </Text>

      <Text style={styles.hourTemp}>
        {Math.round(
          hour.temperature
        )}
        °
      </Text>

      <Text
        style={{
          color: ACCENT,
          marginTop: 6,
        }}
      >
        {hour.precipitation_probability}%
      </Text>
    </View>
  ))}
</ScrollView>

            <Text
              style={
                styles.sectionTitle
              }
            >
              7 Day Outlook
            </Text>

            <View
              style={styles.forecastCard}
            >
              {weather?.daily?.map(
                (
                  day: any,
                  index: number
                ) => (
                  <View
                    key={day.date}
                    style={
                      styles.dayRow
                    }
                  >
                    <Text
                      style={
                        styles.dayName
                      }
                    >
                      {new Date(
                        day.date
                      ).toLocaleDateString(
                        "en-US",
                        {
                          weekday:
                            "short",
                        }
                      )}
                    </Text>

                    <Text
                      style={
                        styles.rain
                      }
                    >
                      {
                        day.precipitation_probability
                      }
                      %
                    </Text>

                    <Text
                      style={
                        styles.tempRange
                      }
                    >
                      {day.temp_max}° /{" "}
                      {day.temp_min}°
                    </Text>
                  </View>
                )
              )}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: BG,
  paddingHorizontal: 20,
},

title: {
  color: "white",
  fontSize: 30,
  fontWeight: "700",
  marginTop: 12,
},

subtitle: {
  color: "#94A3B8",
  marginTop: 8,
},

cityChip: {
  backgroundColor: CARD,
  paddingHorizontal: 18,
  paddingVertical: 10,
  borderRadius: 999,
  marginRight: 10,
},

activeChip: {
  backgroundColor: ACCENT,
},

cityText: {
  color: "white",
  fontWeight: "600",
},

activeText: {
  color: BG,
},

heroCard: {
  backgroundColor: CARD,
  borderRadius: 28,
  padding: 24,
  marginBottom: 24,
},

heroCity: {
  color: "#94A3B8",
  fontSize: 18,
  marginBottom: 24,
},

heroRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

heroTemp: {
  color: "white",
  fontSize: 48,
  fontWeight: "700",
},

heroLabel: {
  color: "#94A3B8",
  marginTop: 4,
  fontSize: 14,
},

bestDayContainer: {
  alignItems: "flex-end",
},

bestDayName: {
  color: ACCENT,
  fontSize: 18,
  fontWeight: "700",
},

bestDayTemp: {
  color: "white",
  fontSize: 32,
  fontWeight: "700",
  marginTop: 4,
},

bestDayMeta: {
  color: "#CBD5E1",
  marginTop: 4,
  fontSize: 14,
},

hourCard: {
  backgroundColor: CARD,
  borderRadius: 18,
  padding: 16,
  width: 90,
  marginRight: 12,
  alignItems: "center",
},
hourTime: {
  color: "#94A3B8",
  fontSize: 13,
},
hourTemp: {
  color: "white",
  fontSize: 24,
  fontWeight: "700",
  marginTop: 8,
},
hourRain: {
  color: ACCENT,
  marginTop: 4,
},

sectionTitle: {
  color: "white",
  fontSize: 22,
  fontWeight: "700",
  marginBottom: 16,
},

forecastCard: {
  backgroundColor: CARD,
  borderRadius: 28,
  padding: 12,
},

dayRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: 18,
  paddingHorizontal: 8,
  borderBottomWidth: 1,
  borderBottomColor: "#12243B",
},

dayName: {
  color: "white",
  fontSize: 16,
  width: 60,
},

rain: {
  color: ACCENT,
},

tempRange: {
  color: "white",
  fontWeight: "600",
},
})