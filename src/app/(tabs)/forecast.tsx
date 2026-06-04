import { getWeather } from "@/services/weather";
import { useLocationStore } from "@/store/location.store";
import { WeatherResponse } from "@/types/weather";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

const bestDay = [...weather.daily].sort(
  (a, b) =>
    a.precipitation_probability -
    b.precipitation_probability
)[0];


  return (
     <SafeAreaView style={styles.container}>

    <ScrollView
      contentContainerStyle={{
      }}
      showsVerticalScrollIndicator={false}
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
  Rain Outlook
</Text>

<View style={styles.rainOutlookCard}>
  {weather.daily.map((day) => (
    <View
      key={day.date}
      style={styles.rainRow}
    >
      <Text style={styles.rainDay}>
        {new Date(
          day.date
        ).toLocaleDateString("en-US", {
          weekday: "short",
        })}
      </Text>

      <View
        style={{
          flex: 1,
          height: 6,
          backgroundColor: "#12243A",
          borderRadius: 10,
          marginHorizontal: 12,
        }}
      >
        <View
          style={{
            width: `${day.precipitation_probability}%`,
            height: 6,
            backgroundColor: ACCENT,
            borderRadius: 10,
          }}
        />
      </View>

      <Text style={styles.rainPercent}>
        {day.precipitation_probability}%
      </Text>
    </View>
  ))}
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

rainOutlookCard: {
  backgroundColor: CARD,
  borderRadius: 12,
  padding: 18,
  marginBottom: 24,
},

rainRow: {
  flexDirection: "row",
  alignItems: "center",
  marginVertical: 10,
},

rainDay: {
  width: 40,
  color: "white",
},

rainPercent: {
  color: ACCENT,
  width: 40,
  textAlign: "right",
},

heroCondition: {
  color: ACCENT,
  fontSize: 16,
  marginTop: 6,
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