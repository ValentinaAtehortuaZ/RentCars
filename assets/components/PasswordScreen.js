import { View, Text } from "react-native";
import { styles } from "../styles/styles";
import { TextInput, Button } from "react-native-paper";
import { useState, useRef } from "react";
import { Link } from "@react-navigation/native";
import { users } from "../data";
import LoginScreen from "./LoginScreen";

export default function PasswordScreen({ navigation }) {
  const [userName, setUserName] = useState("");
  const [resetWord, setResetWord] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChangePassword = () => {
    if (
      userName.trim() === "" ||
      resetWord.trim() === "" ||
      newPassword.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      setErrorMessage("Por favor, completa todos los campos");
      return;
    }

    const user = users.find((u) => u.objUserName === userName);
    if (user && user.objResetWord === resetWord) {
      if (newPassword !== confirmPassword) {
        setErrorMessage("La nueva contraseña y la confirmación no coinciden");
        return;
      }

      // Actualizar la contraseña del usuario en tu sistema
      user.objPassword = newPassword;
      setUserName("");
      setResetWord("");
      setNewPassword("");
      setConfirmPassword("");
      setErrorMessage("");
      navigation.navigate("Login");
    } else {
      setErrorMessage(
        "La combinación de usuario y palabra reservada es incorrecta"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 20, fontWeight: "bold", fontSize: 30 }}>
        ¿Olvidaste la Contraseña?
      </Text>
      <TextInput
        style={{ marginTop: 20 }}
        label="Usuario"
        mode="outlined"
        value={userName}
        onChangeText={(userName) => {
          if (/^[a-zA-Z0-9]*$/.test(userName)) {
            setUserName(userName);
          }
        }}
        right={<TextInput.Icon icon="account" />}
      />
      <TextInput
        style={{ marginTop: 20 }}
        label="Palabra reservada"
        mode="outlined"
        value={resetWord}
        onChangeText={(resetWord) => {
          if (/^[a-zA-Z0-9]*$/.test(resetWord)) {
            setResetWord(resetWord);
          }
        }}
        right={<TextInput.Icon icon="account" />}
      />
      <TextInput
        style={{ marginTop: 20 }}
        label="Nueva contraseña"
        mode="outlined"
        value={newPassword}
        secureTextEntry={!showPassword}
        onChangeText={(newPassword) => {
          if (/^[a-zA-Z0-9]*$/.test(newPassword)) {
            setNewPassword(newPassword);
          }
        }}
        right={
          <TextInput.Icon
            icon="eye"
            name={showPassword ? "eye-off" : "eye"}
            onPress={togglePasswordVisibility}
          />
        }
      />
      <TextInput
        style={{ marginTop: 20 }}
        label="Confirmar contraseña"
        mode="outlined"
        value={confirmPassword}
        secureTextEntry={!showPassword}
        onChangeText={setConfirmPassword}
        right={
          <TextInput.Icon
            icon="eye"
            name={showPassword ? "eye-off" : "eye"}
            onPress={togglePasswordVisibility}
          />
        }
      />
      <Button
        mode="contained"
        style={{ marginTop: 10, backgroundColor: "green" }}
        onPress={handleChangePassword}
      >
        Cambiar Contraseña
      </Button>
      <Text style={{ color: "red" }}>{errorMessage}</Text>
    </View>
  );
}
