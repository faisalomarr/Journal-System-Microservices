package se.kth.faisalo.Entities;
import io.quarkus.hibernate.reactive.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.*;

@Entity
@Table(name = "patient")
public class Patient extends PanacheEntity {

    @Column(name = "first_name", nullable = false)
    public String firstname;

    @Column(name = "last_name", nullable = false)
    public String lastname;

    @Column(nullable = false)
    public int age;

    @Column(nullable = false)
    public String gender;

    @Column(name = "user_id", nullable = false)
    public Long userId;

}


