package se.kth.faisalo.Entities;

import io.quarkus.hibernate.reactive.panache.PanacheEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "location")
public class Location extends PanacheEntity {

    @Column(nullable = false)
    private String address;
}
