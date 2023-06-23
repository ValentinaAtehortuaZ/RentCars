import { View, Text } from "react-native";
import { styles } from "../styles/styles";
import { TextInput, Button } from "react-native-paper";
import { useState, useRef } from "react";
import { users } from "../data";

export default function SingUp({ navigation }) {
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");
  const [resetWord, setResetWord] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = () => {
    if (
      userName.trim() === "" ||
      name.trim() === "" ||
      password.trim() === "" ||
      rol.trim() === "" ||
      resetWord.trim() === ""
    ) {
      setErrorMessage("Por favor, completa todos los campos");
      return;
    }

    const userNameExists = users.some((u) => u.objUserName === userName);
    if (!userNameExists) {
      users.push({
        objUserName: userName,
        objName: name,
        objPassword: password,
        objRol: rol, // Nuevo parámetro "rol"
        objResetWord: resetWord,
      });
      setUserName("");
      setName("");
      setPassword("");
      setRol("");
      setResetWord("");
      setErrorMessage("");
      navigation.navigate("Login");
    } else {
      setErrorMessage("El usuario ya existe");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 20, fontWeight: "bold", fontSize: 30 }}>
        Regístrate
      </Text>
      <TextInput
        style={{ marginTop: 20 }}
        label="Nombre Completo"
        mode="outlined"
        value={name}
        onChangeText={(name) => {
          if (/^[a-zA-Z\s]*$/.test(name)) {
            setName(name);
          }
        }}
        right={<TextInput.Icon icon="account" />}
      />
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
        label="Contraseña"
        mode="outlined"
        value={password}
        secureTextEntry={!showPassword}
        onChangeText={(password) => {
          if (/^[a-zA-Z0-9]*$/.test(password)) {
            setPassword(password);
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
        label="Rol"
        mode="outlined"
        value={rol}
        onChangeText={(rol) => {
          if (/^[a-zA-Z]*$/.test(rol)) {
            setRol(rol);
          }
        }}
        right={<TextInput.Icon icon="group" />}
      />
      <TextInput
        style={{ marginTop: 20 }}
        label="Palabra Reservada"
        mode="outlined"
        value={resetWord}
        onChangeText={(resetWord) => {
          if (/^[a-zA-Z0-9]*$/.test(resetWord)) {
            setResetWord(resetWord);
          }
        }}
        right={<TextInput.Icon icon="book" />}
      />
      <Button
        mode="contained"
        style={{ marginTop: 10, backgroundColor: "green" }}
        onPress={handleSignUp}
      >
        Regístrarse
      </Button>
      <Text style={{ color: "red" }}>{errorMessage}</Text>
    </View>
  );
}
