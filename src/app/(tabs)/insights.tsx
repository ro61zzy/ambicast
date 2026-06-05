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
          paddingBottom: 60,
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
  {weather && (
    <>
      {bestDay && (
  <View style={styles.heroCard}>
    <Text style={styles.heroCity}>
      {selectedCity.name}
    </Text>

    <View style={styles.heroContent}>
      <View>
        <Text style={styles.heroTemp}>
          {Math.round(
            weather.current.temperature
          )}
          °
        </Text>

        <Text style={styles.heroLabel}>
          Current Temperature
        </Text>
      </View>

      <View style={styles.heroDivider} />

      <View style={styles.bestDayContainer}>
        <Text style={styles.bestDayLabel}>
          Best Day
        </Text>

        <Text style={styles.bestDayName}>
          {new Date(
            bestDay.date
          ).toLocaleDateString("en-US", {
            weekday: "long",
          })}
        </Text>

        <Text style={styles.bestDayTemp}>
          {Math.round(bestDay.temp_max)}°
        </Text>

        <Text style={styles.bestDayMeta}>
          {bestDay.precipitation_probability}
          % Rain
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
  contentContainerStyle={{
    paddingBottom: 12,
      }}
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

             <View style={styles.dailyContainer}>
             {weather.daily.map((day) => (
               <View
                 key={day.date}
                 style={styles.dailyRow}
               >
                 <Text style={styles.day}>
                   {new Date(
                     day.date
                   ).toLocaleDateString(
                     "en-US",
                     {
                       weekday: "short",
                     }
                   )}
                 </Text>
           
                <View style={{ flex: 1 }} />
           
             <View style={styles.rainContainer}>
               <Text style={styles.rainLabel}>
                 Rain
               </Text>
           
               <Text style={styles.rainValue}>
                 {day.precipitation_probability}%
               </Text>
             </View>
           
            <View style={styles.tempContainer}>
             <Text style={styles.tempLabel}>
               High / Low
             </Text>
           
             <Text style={styles.tempValue}>
               {Math.round(day.temp_max)}°
               {" / "}
               {Math.round(day.temp_min)}°
             </Text>
           </View>
               </View>
             ))}
      </View>
      </>
    )}
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
  borderRadius: 12,
  padding: 24,
  marginBottom: 18,
},

heroCity: {
  color: "#94A3B8",
  fontSize: 16,
  marginBottom: 20,
},

heroContent: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

heroTemp: {
  color: "white",
  fontSize: 54,
  fontWeight: "700",
},

heroLabel: {
  color: "#94A3B8",
  marginTop: 4,
},

heroDivider: {
  width: 1,
  height: 90,
  backgroundColor: "#12243B",
},

sectionTitle: {
  color: "white",
  fontSize: 22,
  fontWeight: "700",
  marginBottom: 16,
},

bestDayContainer: {
  alignItems: "flex-end",
},

bestDayLabel: {
  color: "#94A3B8",
  fontSize: 13,
},

bestDayName: {
  color: ACCENT,
  fontSize: 18,
  fontWeight: "700",
  marginTop: 4,
},

bestDayTemp: {
  color: "white",
  fontSize: 28,
  fontWeight: "700",
  marginTop: 6,
},

bestDayMeta: {
  color: "#CBD5E1",
  marginTop: 4,
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

  dailyContainer: {
    backgroundColor: CARD,
    borderRadius: 10,
    paddingHorizontal: 12,
  },

  dailyRow: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 8,
  borderBottomWidth: 1,
  borderBottomColor: "#12243A",
},

  day: {
    color: "white",
    width: 50,
    fontSize: 14,
  },
rainContainer: {
  alignItems: "center",
  marginRight: 18,
},
rainLabel: {
  color: "#64748B",
  fontSize: 10,
},
rainValue: {
  color: ACCENT,
  fontWeight: "600",
  marginTop: 2,
},
tempContainer: {
  alignItems: "flex-end",
},
tempLabel: {
  color: "#64748B",
  fontSize: 10,
},
tempValue: {
  color: "white",
  fontWeight: "600",
  marginTop: 2,
},
})