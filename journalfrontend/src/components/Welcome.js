import React from 'react';

export default function Welcome() {
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome, {username}!</h1>
      <p>Role: {role}</p>

      {role === "STAFF" && (
        <p>You have logged in as a staff member. You can manage patient records and provide support.</p>
      )}
      
      {role === "PATIENT" && (
        <p>You have logged in as a patient. You can view your medical records and communicate with staff.</p>
      )}
      
      {role === "PRACTITIONER" && (
        <p>You have logged in as a practitioner. You can view and update patient diagnoses and records.</p>
      )}
      
      <p>You have successfully logged in.</p>
    </div>
  );
}

