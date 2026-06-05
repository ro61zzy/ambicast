import { useLocationStore } from "@/store/location.store";
import { useWeatherStore } from "@/store/weather.store";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

export default function ForecastScreen() {

const city = useLocationStore(
  (state) => state.city
);

const weather = useWeatherStore(
  (state) => state.weather
);

if (!weather) {
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

const bestDay = [...weather.daily].sort(
  (a, b) =>
    a.precipitation_probability -
    b.precipitation_probability
)[0];

const temperatureTrendData = {
  labels: weather.daily.map((day) =>
    new Date(day.date).toLocaleDateString(
      "en-US",
      {
        weekday: "short",
      }
    )
  ),

  datasets: [
    {
      data: weather.daily.map((day) =>
        Math.round(day.temp_max)
      ),
    },
  ],
};

  return (
     <SafeAreaView style={styles.container}>

    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
   paddingBottom:58
      }}
    >
      <Text style={styles.title}>
        Forecast
      </Text>

      <Text style={styles.location}>
        {city} 📍
      </Text>

      <Text style={{color: "white",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 10,}}>
  Best Day This Week
</Text>

<View style={styles.bestDayCard}>
  <Text style={styles.bestDayName}>
    {new Date(
      bestDay.date
    ).toLocaleDateString("en-US", {
      weekday: "long",
    })}
  </Text>

  <View style={{ width: "100%" }}>
  <Text style={styles.bestDayTemp}>
    {Math.round(bestDay.temp_max)}°
  </Text>
  <Text style={styles.bestDayText}>
    Only {bestDay.precipitation_probability}%
    chance of rain
  </Text>
</View>

</View>


<Text style={styles.sectionTitle}>
  Temperature Trend
</Text>

<View style={styles.chartCard}>
  <LineChart
    data={temperatureTrendData}
    width={Dimensions.get("window").width - 70}
    height={220}
    yAxisSuffix="°"
    withInnerLines={false}
    withOuterLines={false}
    withShadow={false}
    chartConfig={{
      backgroundGradientFrom: CARD,
      backgroundGradientTo: CARD,

      decimalPlaces: 0,

      color: (opacity = 1) =>
        `rgba(46, 230, 197, ${opacity})`,

      labelColor: (opacity = 1) =>
        `rgba(255,255,255,${opacity})`,

      propsForDots: {
        r: "5",
        strokeWidth: "2",
        stroke: "#2EE6C5",
      },
    }}
    bezier
    style={{
      borderRadius: 20,
    }}
  />
</View>

      <Text style={styles.sectionTitle}>   
        Weather forecast for the week ahead
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
bestDayCard: {
  backgroundColor: CARD,
  borderRadius: 12,
  padding: 24,
  marginBottom: 17,
},

bestDayName: {
  color: ACCENT,
  fontSize: 20,
},

bestDayTemp: {
  color: "white",
  fontSize: 28,
  fontWeight: "700",
  textAlign:"right"
},

bestDayText: {
  color: "#94A3B8",
  marginTop: 8,
   textAlign:"right"
},
chartCard: {
  backgroundColor: CARD,
  borderRadius: 12,
  paddingVertical: 17,
  paddingHorizontal: 10,
  marginBottom: 24,
},
  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
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
});