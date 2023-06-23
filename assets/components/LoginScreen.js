import { View, Text } from "react-native";
import { styles } from "../styles/styles";
import { TextInput, Button } from "react-native-paper";
import { useState, useRef } from "react";
import { Link } from "@react-navigation/native";
import SingUp from "./SignUp";
import { users } from "../data";
import PasswordScreen from "./PasswordScreen";

export default function LoginScreen({ navigation }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    if (userName.trim() === "" || password.trim() === "") {
      setErrorMessage("Por favor, completa todos los campos");
      return;
    }

    const user = users.find(
      (user) => user.objUserName === userName && user.objPassword === password
    );

    if (user) {
      setUserName("");
      setPassword("");
      setErrorMessage("");

      if (user.objRol === "administrador") {
        navigation.navigate("Cars", {
          name: user.objName,
          userName: user.objUserName,
        });
      } else {
        navigation.navigate("Rent", {
          name: user.objName,
          userName: user.objUserName,
        });
      }
    } else {
      setErrorMessage("Usuario y/o contraseña incorrecta");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 20, fontWeight: "bold", fontSize: 30 }}>
        Inicio de sesión
      </Text>
      <TextInput
        style={{ marginTop: 20 }}
        label="Usuario"
        mode="outlined"
        value={userName}
        left={<TextInput.Icon icon="account" />}
        onChangeText={(userName) => {
          if (/^[a-zA-Z0-9]*$/i.test(userName)) {
            setUserName(userName);
          }
        }}
      />
      <TextInput
        style={{ marginTop: 20 }}
        label="Contraseña"
        mode="outlined"
        secureTextEntry={!showPassword}
        value={password}
        right={
          <TextInput.Icon
            icon="eye"
            name={showPassword ? "eye-off" : "eye"}
            onPress={togglePasswordVisibility}
          />
        }
        onChangeText={(password) => {
          if (/^[a-zA-Z0-9]*$/.test(password)) {
            setPassword(password);
          }
        }}
      />
      <Button
        icon="login"
        mode="contained"
        style={{ marginTop: 30, backgroundColor: "green" }}
        onPress={handleLogin}
      >
        Iniciar sesión
      </Button>
      <Text style={{ color: "red", marginBottom: 30 }}>{errorMessage}</Text>
      <Link to={{ screen: "SignUp" }}>
        ¿No estás registrado? Regístrate aquí
      </Link>
      <Link to={{ screen: "PasswordScreen" }} style={{ marginTop: 20 }}>
        ¿Olvidaste la contraseña?
      </Link>
    </View>
  );
}
