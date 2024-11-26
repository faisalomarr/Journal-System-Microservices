package se.kth.faisalo.journalservice.Service;

import org.springframework.stereotype.Service;
import se.kth.faisalo.journalservice.Dto.ConditionDto;
import se.kth.faisalo.journalservice.Model.Condition;
import se.kth.faisalo.journalservice.Model.Patient;
import se.kth.faisalo.journalservice.Repository.ConditionRepository;
import se.kth.faisalo.journalservice.Repository.PatientRepository;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ConditionService {

    ConditionRepository conditionRepository;
    PatientRepository patientRepository;


    public ConditionService(ConditionRepository conditionRepository, PatientRepository patientRepository) {
        this.conditionRepository= conditionRepository;
        this.patientRepository = patientRepository;
    }

    public List<ConditionDto> getConditions(Long patientId) {
        List<Condition> conditions = conditionRepository.findByPatient_Id(patientId);
        List<ConditionDto> conditionDtos = new ArrayList<>();
        for (Condition condition : conditions) {
            conditionDtos.add(toDto(condition));
        }
        return conditionDtos;
    }

    public Condition addCondition(ConditionDto conditionDto) {
        Optional<Patient> Opatient = patientRepository.findById(conditionDto.getPatientId());
        if (Opatient.isPresent()) {
            Patient patient = Opatient.get();
            return conditionRepository.save(toEntity(conditionDto,patient));
        }
        return null;
    }


    // Convert from entity to DTO
    public ConditionDto toDto(Condition condition) {
        return new ConditionDto(
                condition.getNameOfcondition(),
                condition.getPatient() != null ? condition.getPatient().getId() : null // Only include patientId if Patient is not null
        );
    }

    // Convert from DTO to entity
    public Condition toEntity(ConditionDto conditionDto, Patient patient) {
        Condition condition = new Condition();
        condition.setNameOfcondition(conditionDto.getName());
        condition.setPatient(patient); // Set the patient object

        return condition;
    }
}
