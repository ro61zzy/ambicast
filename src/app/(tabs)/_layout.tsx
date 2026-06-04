import { Tabs } from "expo-router";
import {
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const ACTIVE = "#2EE6C5";
const INACTIVE = "#64748B";
const BG = "#06111F";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: BG,
          borderTopWidth: 0,
          height: 85,
          paddingBottom: 12,
          paddingTop: 8,
        },
        tabBarActiveTintColor: ACTIVE,
        tabBarInactiveTintColor: INACTIVE,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="forecast"
        options={{
          title: "Forecast",
          tabBarIcon: ({ color, size }) => (
            <Feather name="cloud" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="analyze"
        options={{
          title: "Analyze",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="image-search"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ color, size }) => (
            <Feather name="activity" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}