import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  CheckBox,
} from "react-native";
import Navbar from "../components/navbar";

const LabelChecklist = () => {
  const [labels, setLabel] = useState([]);

  useEffect(() => {
    setLabel([
      { id: 2, subject: "Kapitel 1: Historia", selected: false },
      { id: 3, subject: "Kapitel 2: Moderna språket", selected: false },
      { id: 4, subject: "Kapitel 3: Verb", selected: false },
      { id: 5, subject: "Kapitel 4: Sammanfattning", selected: false },
      { id: 6, subject: "Enkel prov", selected: false },
      { id: 7, subject: "Mellan prov", selected: false },
      { id: 8, subject: "Svår prov", selected: false },
    ]);
  }, []);

  const handleSelection = (id) => {
    setLabel((prev) =>
      prev.map((label) =>
        label.id === id ? { ...label, selected: !label.selected } : label
      )
    );
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.h1}>Välkommen till LingoQuest</Text>
      <Text style={styles.h4}>Här kan du ha koll på dina framsteg.</Text>
      <Text style={styles.h4}>
        💡Följ de för att snabbt lära dig det nya språket.
      </Text>

      <FlatList
        data={labels}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <CheckBox
              value={item.selected}
              onValueChange={() => handleSelection(item.id)}
            />
            <TouchableOpacity onPress={() => handleSelection(item.id)}>
              <Text
                style={[styles.label, item.selected && styles.labelChecked]}
              >
                {item.subject}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};
// CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  h1: {
    fontSize: 24,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  h4: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "center", 
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    color: "#555",
    marginLeft: 10, 
    flexShrink: 1, 
  },
  labelChecked: {
    textDecorationLine: "line-through",
    color: "#999",
  },
});

export default LabelChecklist;