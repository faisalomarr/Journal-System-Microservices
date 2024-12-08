import React, { useState } from 'react';
import { Button, Box, Typography, Alert, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SearchPatient() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8084/patientsQuarkus/by-name?name=${username}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Navigate to "/patientsByName" with the data
            navigate("/patientsByName", { state: { patients: data } });
        })
        .catch(error => {
            console.error('Error fetching user', error);
            setErrorMessage("Error fetching user.");
        });
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Search for Patient through firstname or lastname</Typography>
            <Box component="form" onSubmit={handleSearch}>
                <TextField
                    label="name"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ marginBottom: '1rem' }}
                />
                <Button variant="contained" type="submit">Search</Button>
            </Box>

            {errorMessage && (
                <Alert severity="error" style={{ marginTop: '1rem' }}>{errorMessage}</Alert>
            )}
        </Box>
    );
}

export default SearchPatient;
