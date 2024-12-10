import React, { useState, useEffect } from 'react';

export default function PatientSelector({ onSelectPatient }) {
    const [patients, setPatients] = useState([]);
    const [selectedPatientId, setSelectedPatientId] = useState("");

    useEffect(() => {
        // Fetch patients from the backend
        fetch('http://localhost:8081/patientinfo/all') // Backend endpoint
            .then((response) => response.json())
            .then((data) => setPatients(data))
            .catch((error) => console.error("Error fetching patients:", error));
    }, []);

    const handleSelectPatient = (event) => {
        const selectedId = event.target.value;
        setSelectedPatientId(selectedId);
        if (selectedId) {
            onSelectPatient(selectedId); // Notify parent of selected patient ID
        }
    };

    return (
        <div>
            <h2>Select a Patient</h2>
            <select value={selectedPatientId} onChange={handleSelectPatient}>
                <option value="">-- Select Patient --</option>
                {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                        {patient.firstName} {/* Show the patient's name here */}
                    </option>
                ))}
            </select>
        </div>
    );
}
