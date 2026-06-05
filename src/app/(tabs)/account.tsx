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

export default function AccountScreen() {
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
          paddingBottom: 9,
        }}
      >
        <Text style={styles.title}>
          Account
        </Text>

        <View style={styles.profileCard}>
  <Text style={styles.accountLabel}>
    Current Plan
  </Text>

  <Text style={styles.planName}>
    {usage.plan.toUpperCase()}
  </Text>

  <Text style={styles.planDescription}>
    Weather AI API Access
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
    Request Usage
  </Text>

  <Text style={styles.bigNumber}>
    {usage.period.requestCount} /{" "}
    {usage.limits.requests}
  </Text>

  <View style={styles.progressTrack}>
    <View
      style={[
        styles.progressFill,
        {
          width: `${
            (usage.period.requestCount /
              usage.limits.requests) *
            100
          }%`,
        },
      ]}
    />
  </View>
</View>
       <View style={styles.card}>
  <Text style={styles.cardTitle}>
    Billing Period
  </Text>

  <View style={styles.periodRow}>
    <Text style={styles.period}>
      {new Date(
        usage.period.start
      ).toLocaleDateString()}
    </Text>

    <Text style={styles.periodArrow}>
      →
    </Text>

    <Text style={styles.period}>
      {new Date(
        usage.period.end
      ).toLocaleDateString()}
    </Text>
  </View>
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
    borderRadius: 10,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
  },

  plan: {
    color: ACCENT,
    marginTop: 6,
    fontWeight: "600",
  },
  accountLabel: {
  color: "#94A3B8",
  fontSize: 14,
  marginBottom: 8,
},

planName: {
  color: "white",
  fontSize: 25,
  fontWeight: "700",
},

planDescription: {
  color: ACCENT,
  marginTop: 8,
  fontSize: 14,
},

bigNumber: {
  color: "white",
  fontSize: 20,
  fontWeight: "700",
  marginBottom: 18,
},

progressTrack: {
  height: 10,
  borderRadius: 999,
  backgroundColor: "#1E293B",
  overflow: "hidden",
},

progressFill: {
  height: "100%",
  backgroundColor: ACCENT,
  borderRadius: 999,
},

periodRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},
version: {
  color: ACCENT,
  marginTop: 14,
  fontWeight: "600",
},
periodArrow: {
  color: ACCENT,
  fontSize: 18,
  fontWeight: "700",
},

period: {
  color: "white",
  fontSize: 16,
  fontWeight: "600",
},

  card: {
    backgroundColor: CARD,
    borderRadius: 10,
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
    borderRadius: 10,
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
});