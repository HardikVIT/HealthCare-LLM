import React, { useState } from "react";
import axios from "axios";

const SymptomTracker = () => {
    const symptomsList = [
        "Abdominal pain", "Belly pain", "Nausea",
        "Fever", "Cough", "Difficulty breathing",
        "Joint pain", "Fatigue", "Muscle weakness",
        "Chest pain", "Fast heart rate", "Shortness of breath",
        "Blurred vision", "Loss of consciousness",
        "Bladder discomfort", "Painful urination", "Foul smell of urine",
        "Jaundice", "Yellowing of eyes",
        "Excessive hunger", "Unexplained weight loss",
        "Acne", "Blackheads", "Oily skin",
        "Depression", "Irritability", "Appetite loss",
        "Abdominal pain", "Diarrhea",
        "Fatigue", "Fever", "Sweating",
        "Headache", "Nausea", "Sensitivity to light",
        "Back pain", "Leg pain", "Weakness",
        "Ear pain", "Sore throat", "Swollen",
        "Weight gain", "Cold intolerance", "Constipation",
        "Rash", "Itching", "Swelling", "Allergic Reaction",
        "Abnormal heart rhythm", "Dizziness", "Fainting",
        "Dry mouth", "Increased thirst", "Frequent urination",
        "Knee pain", "Swelling", "Stiffness",
        "Vomiting", "Abdominal cramps", "Bloating",
        "Persistent cough", "Chest tightness", "Wheezing",
        "Fatigue", "Hair loss", "Sensitivity to cold",
        "Weakness", "Pale skin", "Shortness of breath",
        "Nausea", "Vomiting", "Abdominal swelling",
        "Painful joints", "Skin rash", "Sun sensitivity",
        "Loss of appetite", "Fatigue", "Weight loss",
        "Frequent urination", "Increased thirst", "Blurred vision",
        "Fever", "Red skin", "Pus discharge",
        "Nausea", "Vomiting", "Severe headache",
        "Redness of eyes", "Watery discharge", "Itching",
        "Hoarseness", "Difficulty swallowing", "Neck swelling"
    ];

    const [selectedSymptoms, setSelectedSymptoms] = useState(["", "", ""]);
    const [prediction, setPrediction] = useState("");

    // Handle symptom selection
    const handleSymptomChange = (index, event) => {
        const updatedSymptoms = [...selectedSymptoms];
        updatedSymptoms[index] = event.target.value;
        setSelectedSymptoms(updatedSymptoms);
    };

    // Send selected symptoms to the backend for prediction
    const sendSymptomsToServer = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/predict", {
                symptoms: selectedSymptoms.filter(symptom => symptom !== ""),
            });
            setPrediction(response.data.predicted_disease);
        } catch (error) {
            console.error("Error predicting disease:", error);
        }
    };

    return (
        <div>
            <h2>Disease Prediction</h2>
            
            {/* Dropdowns for selecting symptoms */}
            {selectedSymptoms.map((symptom, index) => (
                <div key={index}>
                    <label>Symptom {index + 1}: </label>
                    <select value={symptom} onChange={(e) => handleSymptomChange(index, e)}>
                        <option value="">Select a symptom</option>
                        {symptomsList.map((sym, i) => (
                            <option key={i} value={sym}>{sym}</option>
                        ))}
                    </select>
                </div>
            ))}

            <button onClick={sendSymptomsToServer}>Predict Disease</button>

            {prediction && <h3>Predicted Disease: {prediction}</h3>}
        </div>
    );
};

export default SymptomTracker;
