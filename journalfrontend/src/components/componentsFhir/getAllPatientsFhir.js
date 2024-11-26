import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Alert, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function GetAllPatientsFhir() {
  const [patients, setPatients] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Function to fetch all patients
  const fetchAllPatients = () => {
    fetch('http://localhost:8080/pat', {
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
    navigate("/patientfhir");
  };

  // Handler to add condition for a patient
  const handleAddCondition = (patientId) => {
    localStorage.setItem("id", patientId);
    navigate("/addconditionfhir");
  };

  const handleAddObs = (patientId) => {
    localStorage.setItem("id", patientId);
    navigate("/addobsfhir");
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" align="right" gutterBottom>
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
                secondary={`Id: ${patient.id}`}
              />
              <ListItemSecondaryAction sx={{ position: 'absolute', right: 8 }}>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="flex-end"
                  gap={1}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleViewInformation(patient.id)}
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
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleAddObs(patient.id)}
                    color="primary"
                  >
                    Add Observation
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

export default GetAllPatientsFhir;
