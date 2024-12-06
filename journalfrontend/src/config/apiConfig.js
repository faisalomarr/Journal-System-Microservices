// Base URLs for each service in the Kubernetes cluster
export const API_JOURNAL = "http://journal-service";
export const API_MESSAGE = "http://messages-service";
export const API_USER = "http://users-service.default.svc.cluster.local";

// Specific endpoints for services
export const ADD_CONDITION_URL = "http://journal-service/conditions/addcondition";
export const CREATE_OBSERVATION_URL = "http://journal-service/CreateObservation";
export const CREATE_USER_URL = "http://users-service.default.svc.cluster.local/create";
export const CREATE_PATIENT_URL = "http://journal-service/patientinfo/createpatient";
export const CREATE_PRACTITIONER_URL = "http://journal-service/createpractitioner";
export const GET_ALL_PATIENTS_URL = "http://journal-service/patientinfo/all";
export const GET_MESSAGES_URL = "http://messages-service/messages";
export const LOGIN_URL = "http://users-service/login";
export const SEND_MESSAGE_URL = "http://messages-service/messageSend";
export const GET_PATIENT_INFO_URL = "http://journal-service/patientinfo";
export const GET_PATIENT_CONDITIONS_URL = "http://journal-service/conditions/patient";
export const SEARCH_PATIENT_URL = "http://journal-service/patiensQuarkus";
