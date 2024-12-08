package se.kth.faisalo.Dto;
import java.time.LocalDateTime;

public class ObservationDto {
    private Long id;                 // Optional, include if needed
    private String description;
    private LocalDateTime timeOfObservation;

    private String patient;
    private String Practitioner;

    // Default constructor
    public ObservationDto() {}

    // Constructor with parameters
    public ObservationDto(Long id, String description, LocalDateTime timeOfObservation, String patient, String practitioner) {
        this.id = id;
        this.description = description;
        this.timeOfObservation = timeOfObservation;
        this.patient = patient;
        this.Practitioner = practitioner;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getTimeOfObservation() {
        return timeOfObservation;
    }

    public void setTimeOfObservation(LocalDateTime timeOfObservation) {
        this.timeOfObservation = timeOfObservation;
    }

    public String getPatient() {
        return patient;
    }

    public void setPatient(String patient) {
        this.patient = patient;
    }

    public String getPractitioner() {
        return Practitioner;
    }

    public void setPractitioner(String practitioner) {
        Practitioner = practitioner;
    }
}

