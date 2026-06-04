import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { analyzeTrees } from "@/services/trees";
import { TreeAnalysis } from "@/types/tree";

const BG = "#06111F";
const CARD = "#0B1A2C";
const ACCENT = "#2EE6C5";

export default function AnalyzeScreen() {
  const [image, setImage] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(false);

 const [result, setResult] =
  useState<TreeAnalysis | null>(null);

async function pickImage() {
  const response =
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

  if (response.canceled) return;

  const asset = response.assets[0];

  const extension =
    asset.uri.split(".").pop()?.toLowerCase();

  const allowed = [
    "jpg",
    "jpeg",
    "png",
    "webp",
  ];

  if (
    extension &&
    !allowed.includes(extension)
  ) {
    Alert.alert(
      "Unsupported Image",
      "Please select a JPG, PNG or WEBP image."
    );

    return;
  }

  setImage(asset.uri);
  setResult(null);
}

 async function analyzeImage() {
  if (!image) {
    Alert.alert(
      "No Image Selected",
      "Please select an image first."
    );

    return;
  }

  try {
    setLoading(true);

    const data =
      await analyzeTrees(image);

    setResult(data);
  } catch (error) {
    console.log(error);

    Alert.alert(
      "Analysis Failed",
      "Unable to analyze image."
    );
  } finally {
    setLoading(false);
  }
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
          Analyze
        </Text>

        <Text style={styles.subtitle}>
          Upload a farm or tree image
        </Text>

        <View style={styles.infoCard}>
  <Text style={styles.infoTitle}>
    For Best Results
  </Text>

  <Text style={styles.infoText}>
    • JPEG, PNG or WEBP only{"\n"}
    • Maximum 20MB{"\n"}
    • Drone, aerial or satellite farm images work best{"\n"}
    • Ground-level photos may return low confidence results
  </Text>
</View>

        <Pressable
          style={styles.uploadCard}
          onPress={pickImage}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={styles.preview}
            />
          ) : (
            <>
              <Feather
                name="upload"
                size={42}
                color={ACCENT}
              />

              <Text style={styles.uploadText}>
                Choose Image
              </Text>
            </>
          )}
        </Pressable>

        {image && (
          <Pressable
            style={styles.analyzeButton}
            onPress={analyzeImage}
          >
            <Text style={styles.buttonText}>
              Analyze Trees
            </Text>
          </Pressable>
        )}

        {loading && (
          <ActivityIndicator
            size="large"
            color={ACCENT}
            style={{
              marginTop: 30,
            }}
          />
        )}

        {result && (
          <>
            <Text style={styles.sectionTitle}>
              Analysis Results
            </Text>

           <View style={styles.grid}>
  <MetricCard
    label="Trees"
    value={result.total_tree_count}
  />

  <MetricCard
    label="Canopy"
    value={`${result.canopy_coverage_pct}%`}
  />

  <MetricCard
    label="Healthy"
    value={result.tree_health.healthy}
  />

  <MetricCard
    label="Needs Care"
    value={result.tree_health.needs_care}
  />

  <MetricCard
    label="Confidence"
    value={`${Math.round(
      result.confidence_score * 100
    )}%`}
  />
</View>

{result.observations?.length > 0 && (
  <View style={styles.recommendationCard}>
    <Text style={styles.recommendationTitle}>
      Observations
    </Text>

    {result.observations.map(
      (item: string, index: number) => (
        <Text
          key={index}
          style={styles.recommendationText}
        >
          • {item}
        </Text>
      )
    )}
  </View>
)}

            <View style={styles.recommendationCard}>
              <Text
                style={styles.recommendationTitle}
              >
                Recommendations
              </Text>

              {result.recommendations.map(
                (
                  item: string,
                  index: number
                ) => (
                  <Text
                    key={index}
                    style={
                      styles.recommendationText
                    }
                  >
                    • {item}
                  </Text>
                )
              )}
            </View>
          </>
        )}
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

  loaderContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},

loaderText: {
  color: "white",
  fontSize: 18,
  fontWeight: "600",
  marginTop: 16,
},

loaderSubText: {
  color: "#94A3B8",
  marginTop: 8,
},
infoCard: {
  backgroundColor: CARD,
  borderRadius: 8,
  padding: 18,
  marginBottom: 20,
},

infoTitle: {
  color: "white",
  fontSize: 16,
  fontWeight: "600",
  marginBottom: 1,
},

infoText: {
  color: "#CBD5E1",
  fontSize: 12,
  lineHeight: 18,
},
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "700",
    marginTop: 12,
  },

  subtitle: {
    color: "#94A3B8",
    fontSize: 14,
    marginBottom: 24,
  },

  uploadCard: {
    height: 200,
    backgroundColor: CARD,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  preview: {
    width: "100%",
    height: "100%",
  },

  uploadText: {
    color: "white",
    marginTop: 16,
    fontSize: 18,
  },

  analyzeButton: {
    marginTop: 20,
    backgroundColor: ACCENT,
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
  },

  buttonText: {
    color: BG,
    fontWeight: "700",
    fontSize: 16,
  },

  sectionTitle: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
    marginTop: 32,
    marginBottom: 20,
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
  },

  metricValue: {
    color: "white",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 10,
  },

  recommendationCard: {
    backgroundColor: CARD,
    borderRadius: 24,
    padding: 24,
    marginTop: 12,
  },

  recommendationTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },

  recommendationText: {
    color: "#CBD5E1",
    lineHeight: 24,
    marginBottom: 10,
  },
});