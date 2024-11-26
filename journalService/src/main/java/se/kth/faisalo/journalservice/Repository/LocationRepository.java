package se.kth.faisalo.journalservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.kth.faisalo.journalservice.Model.Location;


public interface LocationRepository extends JpaRepository<Location, Long> {
}
