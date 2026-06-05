import { getCurrentLocation } from "@/services/location.service";
import { getWeather } from "@/services/weather";
import { useLocationStore } from "@/store/location.store";
import {
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { WeatherResponse } from "@/types/weather";



export default function HomeScreen() {

const [weather, setWeather] =
  useState<WeatherResponse | null>(null);
const [loading, setLoading] = useState(true);


const setLocation =
  useLocationStore((state) => state.setLocation);

const city =
  useLocationStore((state) => state.city);

useEffect(() => {
  async function loadLocation() {
    try {
      const location = await getCurrentLocation();

      const data = await getWeather(
        location.latitude,
        location.longitude
      );

      setWeather(data);

      setLocation(
        location.latitude,
        location.longitude,
        location.city
      );

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  loadLocation();
}, []);

if (loading) {
  return (
    <SafeAreaView style={styles.loaderContainer}>
      <Text style={styles.loaderTitle}>
  AmbiCast
</Text>

<ActivityIndicator
  size="large"
  color="#2EE6C5"
/>

<Text style={styles.loaderText}>
  Fetching weather data...
</Text>
    </SafeAreaView>
  );
}

if (!weather) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: "white" }}>
        Unable to load weather data
      </Text>
    </SafeAreaView>
  );
}

const now = new Date();

const upcomingHours = weather.hourly
  .filter((hour: any) => {
    return new Date(hour.time) >= now;
  })
  .slice(0, 12);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
    paddingTop: Platform.OS === "android" ? 18 :0,
    paddingBottom: 15,
  }}

      >
        <Text style={styles.greeting}>Good Afternoon 👋</Text>

        <Text style={styles.title}>AmbiCast</Text>

        <View style={styles.hero}>
          <Text style={styles.city}>{city} 📍</Text>

          <Text style={styles.temp}>
            {Math.round(weather.current.temperature)}°
          </Text>

        </View>


        <View style={styles.metrics}>
          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
    <Text style={styles.metricLabel}>
      Humidity
    </Text>

    <Feather
      name="droplet"
      size={20}
      color="#2EE6C5"
    />
  </View>
            <Text style={styles.metricValue}>
              {weather.hourly[0].humidity}
            </Text>
          </View>

          <View style={styles.metricCard}>
             <View style={styles.metricHeader}>
            <Text style={styles.metricLabel}>
              Wind
            </Text>
            <Feather
      name="wind"
      size={24}
      color="#2EE6C5"
    />


             </View>
            <Text style={styles.metricValue}>
              {weather.current.wind_speed}
            </Text>
          </View>

          <View style={styles.metricCard}>
             <View style={styles.metricHeader}>
            <Text style={styles.metricLabel}>
              UV Index
            </Text>
              <Feather
      name="sun"
      size={24}
      color="#2EE6C5"
    />
             </View>
            <Text style={styles.metricValue}>
              {weather.hourly[0].uv_index}
            </Text>
          </View>

          <View style={styles.metricCard}>
             <View style={styles.metricHeader}>
            <Text style={styles.metricLabel}>
              Feels Like
            </Text>
            <MaterialCommunityIcons
      name="thermometer"
      size={24}
      color="#2EE6C5"
    />
             </View>
            <Text style={styles.metricValue}>
              {weather.hourly[0].feels_like}
            </Text>
          </View>
        </View>

        <View style={styles.sunCard}>
  <View>
    <Text style={styles.sunLabel}>
      Sunrise
    </Text>

    <Text style={styles.sunTime}>
      {weather.daily[0].sunrise.slice(11)}
    </Text>
  </View>

  <View>
    <Text style={styles.sunLabel}>
      Sunset
    </Text>

    <Text style={styles.sunTime}>
      {weather.daily[0].sunset.slice(11)}
    </Text>
  </View>
</View>


        <Text style={styles.sectionTitle}>
  Next Hours
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
  },
  loaderTitle: {
  color: "white",
  fontSize: 32,
  fontWeight: "700",
  marginBottom: 24,
},
loaderContainer: {
  flex: 1,
  backgroundColor: BG,
  justifyContent: "center",
  alignItems: "center",
},

loaderText: {
  color: "#94A3B8",
  marginTop: 16,
  fontSize: 16,
},
  greeting: {
    color: "#94A3B8",
    marginTop: 16,
    fontSize: 16,
  },

  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "700",
    marginTop: 8,
    marginBottom: 24,
  },

  hero: {
    backgroundColor: CARD,
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    alignItems:"center"
  },

  city: {
    color: "#94A3B8",
    fontSize: 16,
  },

  temp: {
    color: "white",
    fontSize: 64,
    fontWeight: "700",
  },

  condition: {
    color: ACCENT,
    fontSize: 16,
  },

  card: {
    backgroundColor: CARD,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  cardTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },

  cardText: {
    color: "#CBD5E1",
    lineHeight: 22,
  },

  metrics: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  metricCard: {
    width: "48%",
    backgroundColor: CARD,
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
  },
metricHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

  metricLabel: {
    color: "#94A3B8",
    marginTop: 7,
  },

  metricValue: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 4,
  },
  sectionTitle: {
  color: "white",
  fontSize: 18,
  fontWeight: "600",
  marginBottom: 10,
  marginTop: 14,
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
sunCard: {
  backgroundColor: CARD,
  borderRadius: 20,
  padding: 20,
  flexDirection: "row",
  justifyContent: "space-between",
},
sunLabel: {
  color: "#94A3B8",
  marginBottom: 8,
},
sunTime: {
  color: "white",
  fontSize: 22,
  fontWeight: "700",
},
});