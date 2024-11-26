package se.kth.faisalo.journalservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.kth.faisalo.journalservice.Model.Practitioner;


public interface PractitionerRepository extends JpaRepository<Practitioner, Integer> {
}
