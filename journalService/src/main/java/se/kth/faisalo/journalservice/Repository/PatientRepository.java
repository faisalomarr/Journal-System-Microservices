package se.kth.faisalo.journalservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.kth.faisalo.journalservice.Model.Patient;


public interface PatientRepository extends JpaRepository<Patient, Long> {
    Patient findByUserId(Long userId);
}
