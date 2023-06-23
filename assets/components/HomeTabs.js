import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import LoginScreen from "./LoginScreen";
import RentScreen from "./RentScreen";
import CarScreen from "./CarScreen";
import ReturnScreen from "./ReturnScreen";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveBackgroundColor: "#B2EBB2",
        tabBarInactiveTintColor: "black",
      }}
    >
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color="gray" size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Cars"
        component={CarScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="directions-car" color="gray" size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Rent"
        component={RentScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="attach-money" color="gray" size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Return"
        component={ReturnScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="attach-money" color="gray" size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
