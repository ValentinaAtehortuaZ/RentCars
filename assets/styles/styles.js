import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tableContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tableRow: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: "bold",
    //borderRightWidth: 1,
    borderRightColor: "#ccc",
    marginRight: 10,
  },
  tableCell: {
    flex: 1,
    //borderRightWidth: 1,
    borderRightColor: "#ccc",
    marginRight: 10,
  },
});
