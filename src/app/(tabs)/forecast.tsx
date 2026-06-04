import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { WeatherResponse } from "@/types/weather";
import { getWeather } from "@/services/weather";
import { useLocationStore } from "@/store/location.store";
import {
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function ForecastScreen() {

 const latitude = useLocationStore(
  (state) => state.latitude
);

const longitude = useLocationStore(
  (state) => state.longitude
);

const city = useLocationStore(
  (state) => state.city
);

const [weather, setWeather] =
  useState<WeatherResponse | null>(null);

const [loading, setLoading] =
  useState(true);

useEffect(() => {
  async function loadForecast() {
    try {
      const data = await getWeather(
        latitude!,
        longitude!
      );

      setWeather(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (latitude && longitude) {
    loadForecast();
  }
}, [latitude, longitude]);


if (loading || !weather) {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator
          size="large"
          color={ACCENT}
        />

        <Text
          style={{
            color: "#94A3B8",
            marginTop: 12,
          }}
        >
          Loading forecast...
        </Text>
      </View>
    </SafeAreaView>
  );
}

const now = new Date();

const upcomingHours = weather.hourly
  .filter((hour) => {
    return new Date(hour.time) >= now;
  })
  .slice(0, 12);

  return (
     <SafeAreaView style={styles.container}>

    <ScrollView
      contentContainerStyle={{
        paddingBottom: 120,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>
        Forecast
      </Text>

      <Text style={styles.location}>
        {city} 📍
      </Text>

     <View style={styles.heroCard}>
  <Text style={styles.heroLocation}>
    {city}
  </Text>

  <Text style={styles.heroTemp}>
    {Math.round(weather.current.temperature)}°
  </Text>

  <Text style={styles.heroCondition}>
    Wind {Math.round(weather.current.wind_speed)} km/h
  </Text>

  <View style={styles.heroBadge}>
    <Text style={styles.heroBadgeText}>
      Next 7 Days Outlook
    </Text>
  </View>
</View>

      <Text style={styles.sectionTitle}>
        Hourly Forecast
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

 <Text style={styles.sectionTitle}>
  Sunrise & Sunset
</Text>

<View style={styles.sunRow}>
  <View style={styles.sunItem}>
    <Feather
      name="sunrise"
      size={28}
      color={ACCENT}
    />

    <Text style={styles.sunLabel}>
      Sunrise
    </Text>

    <Text style={styles.sunValue}>
      {weather.daily[0].sunrise
        .split("T")[1]}
    </Text>
  </View>

  <View style={styles.sunItem}>
    <Feather
      name="sunset"
      size={28}
      color={ACCENT}
    />

    <Text style={styles.sunLabel}>
      Sunset
    </Text>

    <Text style={styles.sunValue}>
      {weather.daily[0].sunset
        .split("T")[1]}
    </Text>
  </View>
</View>

      <Text style={styles.sectionTitle}>
        7 Day Forecast
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

    </ScrollView>
     </SafeAreaView>
  );
}

const BG = "#06111F";
const CARD = "#0B1A2C";
const ACCENT = "#2EE6C5";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
  },

  location: {
    color: "#94A3B8",
    fontSize: 18,
    marginTop: 6,
    marginBottom: 24,
  },

 heroCard: {
  backgroundColor: CARD,
  borderRadius: 30,
  padding: 24,
  marginBottom: 24,
},

heroLocation: {
  color: "#94A3B8",
  fontSize: 18,
},

heroTemp: {
  color: "white",
  fontSize: 72,
  fontWeight: "700",
  marginTop: 8,
},

heroCondition: {
  color: ACCENT,
  fontSize: 16,
  marginTop: 6,
},

heroBadge: {
  alignSelf: "flex-start",
  backgroundColor: "#12243A",
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 20,
  marginTop: 16,
},

heroBadgeText: {
  color: ACCENT,
  fontSize: 12,
},

  sectionTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },

  hourCard: {
    width: 90,
    backgroundColor: CARD,
    borderRadius: 20,
    padding: 14,
    marginRight: 10,
    alignItems: "center",
    marginBottom: 20,
  },

  hourTime: {
    color: "#94A3B8",
    marginBottom: 8,
  },

  hourTemp: {
    color: "white",
    fontSize: 28,
    fontWeight: "700",
  },

  dailyContainer: {
    backgroundColor: CARD,
    borderRadius: 24,
    padding: 12,
  },

  dailyRow: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 16,
  borderBottomWidth: 1,
  borderBottomColor: "#12243A",
},

  day: {
    color: "white",
    width: 50,
    fontSize: 14,
  },

  icon: {
    fontSize: 15,
  },

  tempRange: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },

  sunRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 16,
},
sunLabel: {
  color: "#94A3B8",
  fontSize: 14,
  marginTop: 12,
},
sunValue: {
  color: "white",
  fontSize: 24,
  fontWeight: "700",
  marginTop: 8,
},
sunItem: {
  flex: 1,
  backgroundColor: CARD,
  borderRadius: 20,
  padding: 20,
  alignItems: "center",
  marginHorizontal: 6,
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
});