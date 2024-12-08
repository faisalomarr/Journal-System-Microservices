// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Welcome from './components/Welcome';
import Appbar from './components/Appbar'; // Import the Appbar component
import CreateUser from './components/CreateUser'; // adjust the path if necessary
import Message from './components/Message';
import Inbox from './components/Inbox';
import Patient from './components/Patient';
import SearchPatient from './components/componentsSearch/SearchPatient';
import GetAllPatients from './components/getAllPatients';
import AddConditionpatient from './components/AddConditionpatient';
import CreateObservation from './components/CreateObservation'
import GetAllPatientsFhir from './components/componentsFhir/getAllPatientsFhir';
import AddConditionpatientFhir from './components/componentsFhir/AddConditionpatientFhir';
import CreateObservationFhir from './components/componentsFhir/CreateObservationFhir';
import PatientFhir from './components/componentsFhir/PatientFhir';
import PatientsByName from './components/PatientsByName';
import SearchCondition from './components/componentsSearch/SearchCondition';
import SearchEncounters from './components/componentsSearch/SearchEncounters';
import Encounters from './components/Encounters';
import SearchPatientByPractitioner from './components/componentsSearch/SearchPatientByPractitioner';





function App() {
  return (
    <Router>
      <Appbar /> {/* Render Appbar once */}
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/message" element={<Message />} /> {/* Closing tag fixed */}
        <Route path="/inbox" element={<Inbox />} /> {/* Closing tag fixed */}
        <Route path="/patient" element={<Patient />} /> {/* Closing tag fixed */}
        <Route path="/searchpatient" element={<SearchPatient />} /> {/* Closing tag fixed */}
        <Route path="/getAllPatients" element={<GetAllPatients />} /> {/* Closing tag fixed */}
        <Route path="/addcondition" element={<AddConditionpatient />} /> {/* Closing tag fixed */}
        <Route path="/CreateObservation" element={<CreateObservation />} /> {/* New route */}
        <Route path="/pat" element={<GetAllPatientsFhir />} /> {/* New route */}
        <Route path="/addconditionfhir" element={<AddConditionpatientFhir />} /> {/* New route */}
        <Route path="/addobsfhir" element={<CreateObservationFhir />} /> {/* New route */}
        <Route path="/patientfhir" element={<PatientFhir />} /> {/* New route */}
        <Route path="/patientsByName" element={<PatientsByName />} /> {/* New route */}
        <Route path="/searchcondition" element={<SearchCondition />} /> {/* Closing tag fixed */}
        <Route path="/searchencounter" element={<SearchEncounters />} /> {/* Closing tag fixed */}
        <Route path="/Encounters" element={<Encounters />} /> {/* Closing tag fixed */}
        <Route path="/searchpatientbypractitioner" element={<SearchPatientByPractitioner />} /> {/* Closing tag fixed */}




      </Routes>
    </Router>
  );
}

export default App;
