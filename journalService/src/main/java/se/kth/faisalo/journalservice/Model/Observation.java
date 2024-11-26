package se.kth.faisalo.journalservice.Model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Observation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String description;

    private LocalDateTime timeOfObservation;


    @Column(nullable = false)
    private Long PractitionerId;


    @Column(nullable = false)
    private Long PatientId;

    public Observation(Long id, String description, LocalDateTime timeOfObservation,Long practitioner , Long patient ) {
        this.id = id;
        this.description = description;
        this.timeOfObservation = timeOfObservation;
        this.PractitionerId = practitioner;
        this.PatientId = patient;
    }

    public Observation() {

    }

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

    public Long getPatientId() {
        return PatientId;
    }

    public void setPatientId(Long patientId) {
        PatientId = patientId;
    }

    public Long getPractitionerId() {
        return PractitionerId;
    }

    public void setPractitionerId(Long practitionerId) {
        PractitionerId = practitionerId;
    }
}
