
# Journal System




##  Overview
The Journal System is a comprehensive application designed for managing patient information and medical interactions. It began as a monolithic system built in Java with Spring Boot for the backend, React.js for the frontend, and a relational database like MySQL or PostgreSQL. The system evolved into a microservices architecture, incorporating additional functionalities and technologies to ensure scalability, modularity, and high performance. All components are deployed on Kubernetes, ensuring reliability and flexibility in a distributed environment.
## Features

+ **Patient Management**: Secure storage and management of patient information, including medical history and diagnoses.

+ **Medical Observations and Diagnoses**: Allows medical personnel to log observations and assign diagnoses to patients.

+ **User Roles**:
  - **Patient**: View personal medical information and communicate with medical staff.
  - **Doctor**: Access detailed patient information, create observations, and assign conditions.
  - **Staff**: Support doctors and manage communication with patients.

+ **Messaging System**: Enables secure communication between patients, doctors, and staff.

+ **Advanced Search**: Supports searching for patients by name, conditions, or doctors, and viewing specific encounters during a day.

+ **Image Management**: Allows doctors to upload, annotate, and retrieve medical images.
## Technologies Used


+ **Java**: Backend services built with Spring Boot.

+ **Node.js**: Service for image management, including annotations.

+ **Quarkus**: Reactive framework for implementing search functionality.

+ **React.js**: Frontend framework for dynamic and responsive interfaces.

+ **MySQL/PostgreSQL**: Relational databases for structured data storage.

+ **Docker**: Containerization of services for consistent deployment.

+ **Kubernetes**: Orchestration platform for managing distributed microservices.

+ **HAPI FHIR**: External patient database integration for advanced functionality.

+ **Postman**: API testing and scenario validation.


## Deployment

The system is deployed on Kubernetes, leveraging containerized microservices for:

Scalability: Services can be independently scaled based on demand.

High Availability: Distributed architecture ensures fault tolerance.

Extensibility: New services can be added with minimal disruption.

## Summary

The Journal System demonstrates expertise in modern software development, transitioning from a monolithic design to a robust microservices architecture. By integrating advanced features such as image annotation, secure messaging, and reactive search, it offers a scalable and user-friendly solution for managing sensitive medical data in a distributed environment.
