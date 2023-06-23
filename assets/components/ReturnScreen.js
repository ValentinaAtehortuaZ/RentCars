import { View, Text } from "react-native";
import { styles } from "../styles/styles";
import { TextInput, Button } from "react-native-paper";
import { useState, useRef } from "react";
import { Link } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { cars } from "../data";
import LoginScreen from "./LoginScreen";

export default function RentScreen({ navigation, route }) {
  const [rentNumber, setRentNumber] = useState("");
  const [placa, setPlaca] = useState("");
  const [rentDateReturn, setRentDateReturn] = useState("");
  const [rentDateFinal, setRentDateFinal] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { name, setUserName } = route.params;
  const [carList, setCarList] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const navigator = useNavigation();

  const guardarCarro = () => {
    const rentNumberExists = carList.some(
      (car) => car.rentNumber === rentNumber
    );
    if (rentNumberExists) {
      setErrorMessage("RentNumber ya existe");
      return;
    }

    const carIndex = cars.findIndex((car) => car.placa === placa);
    if (carIndex === -1) {
      setErrorMessage("La placa no existe");
      return;
    }

    if (cars[carIndex].rentado) {
      setErrorMessage("Este carro ya fue rentado");
      return;
    }

    const placaRentada = carList.some(
      (car) => car.placa === placa && car.estado === "no disponible"
    );

    if (placaRentada) {
      setErrorMessage("Este carro ya fue rentado");
      return;
    }

    if (cars[carIndex].estado === "no disponible") {
      setErrorMessage("Este carro no está disponible para ser rentado");
      return;
    }

    cars[carIndex].estado = "no disponible";

    if (cars[carIndex].estado === "disponible") {
      cars[carIndex].estado = "no disponible";
    }

    cars[carIndex].rentNumber = rentNumber;
    cars[carIndex].rentDateIncial = rentDateInicial;
    cars[carIndex].rentDateFinal = rentDateFinal;

    setRentNumber("");
    setPlaca("");
    setRentDateInicial("");
    setRentDateFinal("");
    setErrorMessage("");

    setCarList([...carList, cars[carIndex]]);
  };

  const listarCarros = () => {
    if (carList.length === 0) {
      setErrorMessage("No hay carros guardados");
      return;
    }

    setShowTable(true);
    setErrorMessage("");
  };

  const cerrarSesion = () => {
    navigator.navigate("Login"); // Navega a la pantalla de inicio de sesión
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, color: "#333333", fontWeight: "bold" }}>
        Bienvenid@ {name}!
      </Text>
      <Text style={{ marginBottom: 20, fontWeight: "bold" }}>
        Devuelve el carro Rentado
      </Text>
      <TextInput
        style={{ marginTop: 20 }}
        label="RentNumber"
        mode="outlined"
        value={rentNumber}
        left={<TextInput.Icon icon="book" />}
        onChangeText={(value) => {
          if (value.length <= 7 && /^[a-zA-Z0-9]+$/.test(value)) {
            setRentNumber(value);
          }
        }}
      />
      <TextInput
        style={{ marginTop: 20 }}
        label="placa"
        mode="outlined"
        value={placa}
        left={<TextInput.Icon icon="car" />}
        onChangeText={(value) => {
          if (value.length <= 7 && /^[a-zA-Z0-9]+$/.test(value)) {
            setPlaca(value);
          }
        }}
      />
      <TextInput
        style={{ marginTop: 20 }}
        label="RentDateReturn"
        mode="outlined"
        value={rentDateReturn}
        left={<TextInput.Icon icon="calendar" />}
        onChangeText={(value) => {
          setRentDateReturn(value);
        }}
        placeholder="YYYY-MM-DD"
      />
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Button
          icon="login"
          mode="contained"
          style={{
            marginTop: 30,
            backgroundColor: "green",
          }}
          onPress={guardarCarro}
        >
          Guardar
        </Button>
        <Text style={{ color: "red" }}>{errorMessage}</Text>
      </View>
      <Button onPress={cerrarSesion}>Cerrar sesión</Button>
    </View>
  );
}
