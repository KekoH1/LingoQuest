import React, { useEffect, useState } from "react";
import '../assets/navbar.css';
import  "../assets/checklist.css"
import Navbar from "../components/navbar";


const LabelChecklist = () => {
  const [labels, setLabel] = useState([]);

  useEffect(() => {
    setLabel([
      { id: 1, subject: "CheckBox1", selected: false },
      { id: 2, subject: "CheckBox2", selected: false },
      { id: 3, subject: "CheckBox3", selected: false },
      { id: 4, subject: "CheckBox4", selected: false },
      { id: 5, subject: "CheckBox5", selected: false },
      { id: 6, subject: "CheckBox6", selected: false },
      { id: 7, subject: "CheckBox7", selected: false },
      { id: 8, subject: "CheckBox8", selected: false },
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
    <div>
      <Navbar />
      <div className="container">
        <h1 className="h1">Välkommen till LingoQuest</h1>
        <h4 className="h4">Här kan du ha koll på dina framsteg.</h4>
        <h4 className="h4">💡Följ de för att snabbt lära dig det nya språket.</h4>
        <ul className="list">
          {labels.map((label) => (
            <li key={label.id}>
              <input
                type="checkbox"
                checked={label.selected}
                onChange={() => handleSelection(label.id)}
              />
              <label>{label.subject}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LabelChecklist;
