import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Alert, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GET_ALL_PATIENTS_URL } from '../config/apiConfig'; // Import centralized URL

function GetAllPatients() {
  const [patients, setPatients] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Function to fetch all patients
  const fetchAllPatients = () => {
    fetch(GET_ALL_PATIENTS_URL, { // Use centralized URL
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Expect JSON response
      })
      .then(data => {
        console.log("Fetched patients data:", data); 
        setPatients(data); // Set patients data in state
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
        setErrorMessage("Error fetching patients.");
      });
  };

  // useEffect to fetch patients when component mounts
  useEffect(() => {
    fetchAllPatients();
  }, []);

  // Handler to view patient information
  const handleViewInformation = (patientId) => {
    localStorage.setItem("id", patientId);
    navigate("/patient");
  };

  // Handler to add condition for a patient
  const handleAddCondition = (patientId) => {
    localStorage.setItem("id", patientId);
    navigate("/addcondition");
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" align="center" gutterBottom>
        All Patients
      </Typography>
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      {patients.length > 0 ? (
        <List>
          {patients.map((patient, index) => (
            <ListItem key={index} divider sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary={`${patient.firstName} ${patient.lastName}`}
                secondary={`Age: ${patient.age}`}
              />
              <ListItemSecondaryAction sx={{ right: 0 }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleViewInformation(patient.userId)}
                    sx={{ mb: 1 }}
                  >
                    View Info
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleAddCondition(patient.id)}
                    color="primary"
                  >
                    Add Condition
                  </Button>
                </Box>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography align="center">No patients found.</Typography>
      )}
      <Button variant="contained" onClick={fetchAllPatients} fullWidth sx={{ mt: 2 }}>
        Refresh Patients
      </Button>
    </Box>
  );
}

export default GetAllPatients;
