package se.kth.faisalo.journalservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.kth.faisalo.journalservice.Model.Encounter;


public interface EncounterRepository extends JpaRepository<Encounter, Long> {
}
