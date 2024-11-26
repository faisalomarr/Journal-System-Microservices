package se.kth.faisalo.journalservice.Service;


import se.kth.faisalo.journalservice.Dto.EncounterDto;
import se.kth.faisalo.journalservice.Model.Encounter;
import se.kth.faisalo.journalservice.Model.Location;
import se.kth.faisalo.journalservice.Model.Patient;
import se.kth.faisalo.journalservice.Model.Practitioner;

public class EncounterService {

    // Convert from entity to DTO
    public EncounterDto toDto(Encounter encounter) {
        return new EncounterDto(
                encounter.getId(),
                encounter.getEncounterDate(),
                encounter.getEncounterType(),
                encounter.getPatient() != null ? encounter.getPatient().getId() : null,
                encounter.getPractitioner() != null ? encounter.getPractitioner().getId() : null,
                encounter.getLocation() != null ? encounter.getLocation().getId() : null
        );
    }

    // Convert from DTO to entity
    public Encounter toEntity(EncounterDto encounterDto, Patient patient, Practitioner practitioner, Location location) {
        Encounter encounter = new Encounter();
        encounter.setId(encounterDto.getId());
        encounter.setEncounterDate(encounterDto.getEncounterDate());
        encounter.setEncounterType(encounterDto.getEncounterType());
        encounter.setPatient(patient);
        encounter.setPractitioner(practitioner);
        encounter.setLocation(location);

        return encounter;
    }
}
