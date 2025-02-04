import React, { useState } from 'react';
import { Button, Box, Typography, Alert, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SearchCondition() {
    const navigate = useNavigate();
    const [condition, SetCondition] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSearch = (e) => {
        console.log("Condition:", condition);
        e.preventDefault();

        fetch(`http://localhost:8084/patientsQuarkus/by-condition?condition=${condition}`, {
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
            <Typography variant="h4" gutterBottom>Search for Patient through condition</Typography>
            <Box component="form" onSubmit={handleSearch}>
                <TextField
                    label="Condition"
                    variant="outlined"
                    value={condition}
                    onChange={(e) => SetCondition(e.target.value)}
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

export default SearchCondition;
