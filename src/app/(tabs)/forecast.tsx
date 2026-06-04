import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const hourlyForecast = [
  { time: "Now", temp: 24 },
  { time: "3 PM", temp: 25 },
  { time: "4 PM", temp: 24 },
  { time: "5 PM", temp: 23 },
  { time: "6 PM", temp: 22 },
  { time: "7 PM", temp: 21 },
];



export default function ForecastScreen() {
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
        Kiambu County
      </Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>
          AI Summary
        </Text>

        <Text style={styles.summaryText}>
          Rain is likely tomorrow afternoon.
          Outdoor activities are recommended
          before 2 PM. Weekend conditions
          remain favorable.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Hourly Forecast
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {hourlyForecast.map((hour) => (
          <View
            key={hour.time}
            style={styles.hourCard}
          >
            <Text style={styles.hourTime}>
              {hour.time}
            </Text>

            <Text style={styles.hourTemp}>
              {hour.temp}°
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

  summaryCard: {
    backgroundColor: CARD,
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
  },

  summaryTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },

  summaryText: {
    color: "#CBD5E1",
    lineHeight: 24,
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
    padding: 16,
    marginRight: 12,
    alignItems: "center",
    marginBottom: 24,
  },

  hourTime: {
    color: "#94A3B8",
    marginBottom: 12,
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
    paddingHorizontal: 8,
  },

  day: {
    color: "white",
    width: 50,
    fontSize: 16,
  },

  icon: {
    fontSize: 22,
  },

  tempRange: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});