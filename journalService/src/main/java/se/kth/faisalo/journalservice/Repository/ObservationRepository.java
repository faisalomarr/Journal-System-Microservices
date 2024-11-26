package se.kth.faisalo.journalservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.kth.faisalo.journalservice.Model.Observation;


public interface ObservationRepository extends JpaRepository<Observation, Long> {


}
