import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { styles } from "./assets/styles/styles";
import SignUp from "./assets/components/SignUp";
import HomeTabs from "./assets/components/HomeTabs";
import PasswordScreen from "./assets/components/PasswordScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{ title: "Sistema De Renta de Carros" }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: "Registro" }}
        />
        <Stack.Screen
          name="PasswordScreen"
          component={PasswordScreen}
          options={{ title: "Recuperar conraseña" }}
        />

        {/* <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "Perfil de Usuario" }}
        />
        <Stack.Screen
          name="Car"
          component={Car}
          options={{ title: "Carros" }}
  />*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
