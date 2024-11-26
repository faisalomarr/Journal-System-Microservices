package se.kth.faisalo.journalservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.kth.faisalo.journalservice.Model.Organization;


public interface OrganizationRepository extends JpaRepository<Organization, Long> {
}
