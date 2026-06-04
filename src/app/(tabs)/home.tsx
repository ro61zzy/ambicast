import { getCurrentLocation } from "@/services/location.service";
import { useLocationStore } from "@/store/location.store";
import { useEffect } from "react";
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";



const weather = {
  city: "Nairobi",
  temperature: 24,
  condition: "Partly Cloudy",
  insight:
    "Rain expected later this afternoon. Consider completing outdoor activities before 4PM.",
};

export default function HomeScreen() {

    const insets = useSafeAreaInsets();

const setLocation =
  useLocationStore((state) => state.setLocation);

const city =
  useLocationStore((state) => state.city);

useEffect(() => {
  async function loadLocation() {
    try {
      const location =
        await getCurrentLocation();

      console.log("LOCATION", location);

      setLocation(
  location.latitude,
  location.longitude,
  location.city
);
    } catch (error) {
      console.log(error);
    }
  }

  loadLocation();
}, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
    paddingTop: Platform.OS === "android" ? 18 :0,
    paddingBottom: 12,
  }}

      >
        <Text style={styles.greeting}>Good Afternoon 👋</Text>

        <Text style={styles.title}>AmbiCast</Text>

        <View style={styles.hero}>
          <Text style={styles.city}>{city} 📍</Text>

          <Text style={styles.temp}>
            {weather.temperature}°
          </Text>

          <Text style={styles.condition}>
            {weather.condition}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            AI Insight
          </Text>

          <Text style={styles.cardText}>
            {weather.insight}
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
              72%
            </Text>
          </View>

          <View style={styles.metricCard}>
             <View style={styles.metricHeader}>

            <Feather
      name="wind"
      size={24}
      color="#2EE6C5"
    />

            <Text style={styles.metricLabel}>
              Wind
            </Text>
             </View>
            <Text style={styles.metricValue}>
              12 km/h
            </Text>
          </View>

          <View style={styles.metricCard}>
             <View style={styles.metricHeader}>
              <Feather
      name="sun"
      size={24}
      color="#2EE6C5"
    />
            <Text style={styles.metricLabel}>
              UV Index
            </Text>
             </View>
            <Text style={styles.metricValue}>
              4
            </Text>
          </View>

          <View style={styles.metricCard}>
             <View style={styles.metricHeader}>
            <MaterialCommunityIcons
      name="thermometer"
      size={24}
      color="#2EE6C5"
    />
            <Text style={styles.metricLabel}>
              Feels Like
            </Text>
             </View>
            <Text style={styles.metricValue}>
              26°
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Coming Next
          </Text>

          <Text style={styles.cardText}>
            Hourly forecasts, weather charts,
            image analysis, and AI-powered
            recommendations.
          </Text>
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
});