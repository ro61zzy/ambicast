import { getUsage } from "@/services/usage";
import { useLocationStore } from "@/store/location.store";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BG = "#06111F";
const CARD = "#0B1A2C";
const ACCENT = "#2EE6C5";

export default function ProfileScreen() {
  const city = useLocationStore(
    (state) => state.city
  );

  const [usage, setUsage] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadUsage() {
      try {
        const data =
          await getUsage();

        setUsage(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadUsage();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator
          size="large"
          color={ACCENT}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        <Text style={styles.title}>
          Profile
        </Text>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Feather
              name="cloud"
              size={32}
              color={ACCENT}
            />
          </View>

          <Text style={styles.appName}>
            AmbiCast
          </Text>

          <Text style={styles.plan}>
            {usage.plan.toUpperCase()} PLAN
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Current Location
          </Text>

          <Text style={styles.cardValue}>
            {city || "Unknown"} 📍
          </Text>
        </View>

        <View style={styles.grid}>
          <MetricCard
            label="Requests Used"
            value={
              usage.period.requestCount
            }
          />

          <MetricCard
            label="Remaining"
            value={
              usage.remaining.requests
            }
          />

          <MetricCard
            label="AI Used"
            value={
              usage.period.aiRequestCount
            }
          />

          <MetricCard
            label="AI Left"
            value={
              usage.remaining.aiRequests
            }
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Billing Period
          </Text>

          <Text style={styles.period}>
            {new Date(
              usage.period.start
            ).toLocaleDateString()}
          </Text>

          <Text style={styles.periodArrow}>
            ↓
          </Text>

          <Text style={styles.period}>
            {new Date(
              usage.period.end
            ).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            About AmbiCast
          </Text>

          <Text style={styles.about}>
            AmbiCast is a mobile weather and
            environmental intelligence
            application powered by Weather AI
            APIs.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>
        {label}
      </Text>

      <Text style={styles.metricValue}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingHorizontal: 20,
  },

  loader: {
    flex: 1,
    backgroundColor: BG,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 24,
  },

  profileCard: {
    backgroundColor: CARD,
    borderRadius: 28,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(46,230,197,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  appName: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },

  plan: {
    color: ACCENT,
    marginTop: 6,
    fontWeight: "600",
  },

  card: {
    backgroundColor: CARD,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },

  cardTitle: {
    color: "#94A3B8",
    marginBottom: 10,
    fontSize: 15,
  },

  cardValue: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  metricCard: {
    width: "48%",
    backgroundColor: CARD,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },

  metricLabel: {
    color: "#94A3B8",
    fontSize: 14,
  },

  metricValue: {
    color: "white",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 10,
  },

  period: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

  periodArrow: {
    color: ACCENT,
    fontSize: 22,
    marginVertical: 10,
  },

  about: {
    color: "#CBD5E1",
    lineHeight: 24,
  },
});