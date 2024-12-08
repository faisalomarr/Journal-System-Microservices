package se.kth.faisalo.Entities;
import io.quarkus.hibernate.reactive.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;


@Entity
@Table(name = "practitioner")
public class Practitioner extends PanacheEntity {
    // Define your fields here
    @Column(name = "first_name", nullable = false)
    public String firstname;

    @Column(name = "last_name", nullable = false)
    public String lastname;

    @Column(name = "job_title", nullable = false)
    public String jobtitle;


}
