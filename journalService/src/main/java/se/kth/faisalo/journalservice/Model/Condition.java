package se.kth.faisalo.journalservice.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "patientCondition")
public class Condition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nameOfcondition;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    public Condition(Long id, String name, Patient patient) {
        this.id = id;
        this.nameOfcondition = name;
        this.patient = patient;
    }

    public Condition() {
    }

    public String getNameOfcondition() {
        return nameOfcondition;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setNameOfcondition(String nameOfcondition) {
        this.nameOfcondition = nameOfcondition;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }
}
