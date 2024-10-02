import React, { useState, useEffect } from 'react';
import { View, Text, CheckBox } from 'react-native'; // Assuming you're using React Native components

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
    <View>
      <Text>Välkommen till LingoQuest</Text>
      {labels.map((label) => (
        <View key={label.id}>
          <CheckBox
            value={label.selected}
            onValueChange={() => handleSelection(label.id)}
          />
          <Text>{label.subject}</Text>
        </View>
      ))}
    </View>
  );
};

export default LabelChecklist;