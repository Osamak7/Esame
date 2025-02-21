import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import axios from "axios";
import mockData from "./assets/mockData.json";

const { width } = Dimensions.get("window");
const SERVER_URL = "http://172.25.77.29:5004"; // IP corretto del server Flask

export default function App() {
  const [data, setData] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [isTableVisible, setIsTableVisible] = useState(false);

  const fetchData = async (endpoint) => {
    try {
      const response = await axios.get(`${SERVER_URL}${endpoint}`);
      setData(response.data);
      if (response.data.length > 0) {
        setHeaders(Object.keys(response.data[0]));
      }
    } catch (err) {
      console.error("Errore nella richiesta:", err);
      const dataset = mockData[endpoint.replace("/", "")];
      setData(dataset);
      if (dataset.length > 0) {
        setHeaders(Object.keys(dataset[0]));
      }
    }
    setIsTableVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topNavbar}>
        <Text style={styles.title}>Osama</Text>
      </View>

      <View style={styles.body}>
        {!isTableVisible && (
          <View style={styles.aboutContainer}>
            <Text style={styles.aboutTitle}>Chi siamo</Text>
            <Text style={styles.aboutText}>
              Questo progetto nasce con l'obiettivo di semplificare la gestione delle presenze e la visualizzazione di dati importanti per gli studenti e il personale scolastico. Utilizziamo tecnologie moderne per offrire un'esperienza intuitiva e veloce.
            </Text>
          </View>
        )}

        {isTableVisible && (
          <View style={styles.tableContainer}>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                {headers.map((header, index) => (
                  <Text key={index} style={[styles.cell, styles.headerCell]}>
                    {header}
                  </Text>
                ))}
              </View>
              <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.row}>
                    {headers.map((key, index) => (
                      <Text key={index} style={styles.cell}>
                        {item[key]?.toString() || "-"}
                      </Text>
                    ))}
                  </View>
                )}
              />
            </View>
          </View>
        )}
      </View>

      <View style={styles.bottomNavbar}>
        <TouchableOpacity onPress={() => setIsTableVisible(false)}>
          <Image source={require("./assets/icon.jpeg")} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => fetchData("/assenza")}>
          <Text style={styles.navItem}>Assenza</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => fetchData("/progetto")}>
          <Text style={styles.navItem}>Progetto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => fetchData("/wp")}>
          <Text style={styles.navItem}>WP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C3E50",
  },
  topNavbar: {
    height: 60,
    backgroundColor: "#1B2631",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  aboutContainer: {
    backgroundColor: "#34495E",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  aboutTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 16,
    color: "#ECF0F1",
    textAlign: "justify",
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  tableContainer: {
    width: "95%",
    alignItems: "center",
    paddingVertical: 20,
  },
  table: {
    width: "100%",
    backgroundColor: "#34495E",
    borderRadius: 10,
    paddingBottom: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1F618D",
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#5D6D7E",
    backgroundColor: "#2E4053",
  },
  cell: {
    flex: 1,
    padding: 10,
    color: "#ECF0F1",
    fontSize: 14,
    minWidth: 80,
    textAlign: "center",
  },
  headerCell: {
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#1F618D",
  },
  bottomNavbar: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#1B2631",
    borderTopWidth: 2,
    borderTopColor: "#34495E",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
  },
  button: {
    backgroundColor: "#3498DB",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  navItem: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  logo: {
    width: 45,
    height: 45,
    borderRadius: 10,
  },
});
