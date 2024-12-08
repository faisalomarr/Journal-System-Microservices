package se.kth.faisalo.Dto;

import java.time.LocalDateTime;

public class EncounterDto {
    private Long id;
    private LocalDateTime encounterDate;
    private String encounterType;
    private Long patientId;
    private Long practitionerId;
    private Long locationId;


    public EncounterDto() {}

    
    public EncounterDto(Long id, LocalDateTime encounterDate, String encounterType, Long patientId, Long practitionerId, Long locationId) {
        this.id = id;
        this.encounterDate = encounterDate;
        this.encounterType = encounterType;
        this.patientId = patientId;
        this.practitionerId = practitionerId;
        this.locationId = locationId;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getEncounterDate() {
        return encounterDate;
    }

    public void setEncounterDate(LocalDateTime encounterDate) {
        this.encounterDate = encounterDate;
    }

    public String getEncounterType() {
        return encounterType;
    }

    public void setEncounterType(String encounterType) {
        this.encounterType = encounterType;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public Long getPractitionerId() {
        return practitionerId;
    }

    public void setPractitionerId(Long practitionerId) {
        this.practitionerId = practitionerId;
    }

    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }
}
