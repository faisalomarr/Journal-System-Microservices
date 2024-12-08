package se.kth.faisalo.Repositories;
import io.quarkus.hibernate.reactive.panache.PanacheRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.QueryParam;
import se.kth.faisalo.Entities.Patient;


import java.util.List;

@ApplicationScoped
public class PatientRepository implements PanacheRepository<Patient> {

    public Uni<List<Patient>> searchPatientsByCondition(String condition) {
        String query = """
                    SELECT DISTINCT p FROM Patient p
                    JOIN Condition c ON c.patient.id = p.id
                    WHERE c.name LIKE ?1
                """;
        return Patient.find(query, "%" + condition + "%").list();
    }

    public Uni<List<Patient>> searchPatientsByName(String name) {
        String query = """
        SELECT DISTINCT p FROM Patient p
        WHERE p.firstname LIKE ?1 OR p.lastname LIKE ?1
    """;
        return Patient.find(query, "%" + name + "%").list();
    }

    public Uni<List<Patient>> searchPatientsByPractitioner(String name) {
        String query = """
                    SELECT DISTINCT p FROM Patient p
                    JOIN Encounter e ON e.patient.id = p.id
                    JOIN Practitioner pr ON e.practitioner.id = pr.id
                    WHERE pr.firstname LIKE ?1 OR pr.lastname LIKE ?1
                """;
        return Patient.find(query, "%" + name + "%").list();
    }
}
