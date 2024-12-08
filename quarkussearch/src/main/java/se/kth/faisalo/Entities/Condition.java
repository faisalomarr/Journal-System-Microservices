package se.kth.faisalo.Entities;

import io.quarkus.hibernate.reactive.panache.PanacheEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "patient_condition")
public class Condition extends PanacheEntity {

    @Column(name = "name_ofcondition", nullable = false)
    public String name;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false) // Links to the patient table
    private Patient patient;

    // Getters and setters
    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }
}


