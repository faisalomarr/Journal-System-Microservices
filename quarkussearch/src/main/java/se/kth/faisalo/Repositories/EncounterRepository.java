package se.kth.faisalo.Repositories;

import io.quarkus.hibernate.reactive.panache.PanacheRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import se.kth.faisalo.Entities.Encounter;

import java.util.List;

@ApplicationScoped
public class EncounterRepository implements PanacheRepository<Encounter> {

    public Uni<List<Encounter>> searchEncounters(String name) {
        String query = """
        SELECT DISTINCT e FROM Encounter e
        JOIN e.practitioner p
        WHERE (p.firstname LIKE ?1 OR p.lastname LIKE ?1)
        """;
        return find(query, "%" + name + "%").list()
                .invoke(encounters -> System.out.println("Found encounters: " + encounters));
    }
}
