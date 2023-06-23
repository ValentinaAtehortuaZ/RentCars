import { View, Text } from "react-native";
import { styles } from "../styles/styles";
import { TextInput, Button } from "react-native-paper";
import { useState, useRef } from "react";
import { Link } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { cars } from "../data";
import { users } from "../data";

export default function CarScreen({ navigation, route }) {
  const [placa, setPlaca] = useState("");
  const [marca, setMarca] = useState("");
  const [estado, setEstado] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { name, userName } = route.params;
  const [carList, setCarList] = useState([]);
  const [dailyValue, setDailyValue] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const validateCarStatus = (estado) => {
    if (estado === "disponible" || estado === "no disponible") {
      setEstado(estado);
    }
  };

  const guardarCarro = () => {
    if (!placa || !marca || !estado) {
      setErrorMessage("Todos los campos son requeridos");
      return;
    }

    const nuevoCarro = {
      placa: placa,
      marca: marca,
      estado: estado,
    };

    cars.push(nuevoCarro);

    setPlaca("");
    setMarca("");
    setEstado("");
    setErrorMessage("");
  };
  const listarCarros = () => {
    if (cars.length === 0) {
      setErrorMessage("No hay carros guardados");
      return;
    }

    setShowTable(true);
    setErrorMessage("");
  };

  const tableRows = cars.map((car) => (
    <View style={styles.tableRow} key={car.placa}>
      <Text style={styles.tableCell}>{car.placa}</Text>
      <Text style={styles.tableCell}>{car.marca}</Text>
      <Text style={styles.tableCell}>{car.estado}</Text>
      <Text style={styles.tableCell}>{car.dailyValue}</Text>
    </View>
  ));

  const handleRentCar = () => {
    if (cars.length === 0) {
      setErrorMessage("No se ha guardado ningún carro");
      return;
    }

    const carData = {
      placa: placa,
      name: name,
    };

    navigation.navigate("Rent", carData);
    setErrorMessage("");
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, color: "#333333", fontWeight: "bold" }}>
        Bienvenid@ {name}!
      </Text>
      <Text style={{ marginBottom: 20, fontWeight: "bold" }}>
        Registra tu Carro
      </Text>
      <TextInput
        style={{ marginTop: 20 }}
        label="placa"
        mode="outlined"
        value={placa}
        onChangeText={(value) => {
          if (value.length <= 7 && /^[a-zA-Z0-9]+$/.test(value)) {
            setPlaca(value);
          }
        }}
      />
      <TextInput
        style={{ marginTop: 20 }}
        label="marca"
        mode="outlined"
        value={marca}
        onChangeText={(marca) => {
          if (/^[a-zA-Z0-9]*$/.test(marca)) {
            setMarca(marca);
          }
        }}
      />
      <TextInput
        style={{ marginTop: 20 }}
        label="estado"
        mode="outlined"
        value={estado}
        onChangeText={(value) => {
          validateCarStatus(value.toLowerCase());
          setEstado(value);
        }}
        placeholder="Ingrese el estado del vehículo"
      />
      {estado !== "" && <Text>Estado del vehículo: {estado}</Text>}
      <TextInput
        style={{ marginTop: 20 }}
        label="DailyValue"
        placeholder="350000"
        mode="outlined"
        value={dailyValue}
        onChangeText={(value) => {
          if (value.length <= 7 && /^[0-9]+$/.test(value)) {
            setDailyValue(value);
          }
        }}
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
        <Button
          icon="book"
          mode="contained"
          style={{
            marginTop: 30,
            backgroundColor: "red",
            marginLeft: 20,
          }}
          onPress={listarCarros}
        >
          Listar
        </Button>
      </View>
      <Text style={{ color: "red" }}>{errorMessage}</Text>
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>Placa</Text>
          <Text style={styles.tableHeaderCell}>Marca</Text>
          <Text style={styles.tableHeaderCell}>Estado</Text>
          <Text style={styles.tableHeaderCell}>DailyValue</Text>
        </View>
        {showTable && tableRows}
      </View>
      <Button
        icon="car"
        mode="contained"
        style={{
          marginTop: 30,
          backgroundColor: "gray",
          marginLeft: 20,
        }}
        onPress={handleRentCar}
      >
        Rentar Carro
      </Button>
    </View>
  );
}
