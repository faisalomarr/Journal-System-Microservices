package se.kth.faisalo.journalservice.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import se.kth.faisalo.journalservice.Dto.PatientDto;
import se.kth.faisalo.journalservice.Dto.UserDto;
import se.kth.faisalo.journalservice.Model.Patient;
import se.kth.faisalo.journalservice.Repository.PatientRepository;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    private PatientRepository patientRepository;

    private final WebClient webClient;

    public PatientService(PatientRepository patientRepository ) {
        this.patientRepository = patientRepository;
        this.webClient = WebClient.builder().baseUrl("http://localhost:8082").build();

    }


    public PatientDto getPatientById(Long id) {
        if(id<1){
            throw new IllegalArgumentException("Id must be greater than 0");
        }
        Patient patient =patientRepository.findByUserId(id);
        if(patient==null){
            throw new IllegalArgumentException("Patient not found");
        }
        return toDto(patient);
    }

    public List<PatientDto> getPatients() {
        List<Patient> patients = patientRepository.findAll();
        List<PatientDto> patientDtos = new ArrayList<PatientDto>();
        for (Patient patient : patients) {
            patientDtos.add(toDto(patient));
        }
        return patientDtos;
    }

    public Patient createPatient(PatientDto patientDto) {
        UserDto user = getUserFromUserServiceById(patientDto.getUserId());
        if(user!=null){
            return patientRepository.save(toEntity(patientDto,user));
        }
        return null;
    }


    // Convert from entity to DTO
    public PatientDto toDto(Patient patient) {
        return new PatientDto(
                patient.getId(),
                patient.getFirstName(),
                patient.getLastName(),
                patient.getAge(),
                patient.getGender() != null ? patient.getGender().name().toUpperCase() : null,
                patient.getUserId()

        );
    }

    // Convert from DTO to entity
    public Patient toEntity(PatientDto patientDto, UserDto user) {
        Patient patient = new Patient();
        patient.setFirstName(patientDto.getFirstName());
        patient.setLastName(patientDto.getLastName());
        patient.setAge(patientDto.getAge());
        patient.setGender(patientDto.getGender() != null ? Patient.Gender.valueOf(patientDto.getGender()) : null);
        patient.setUserId(user.getId());
        return patient;
    }

    public UserDto getUserFromUserServiceById(Long userId) {
        return webClient.get()
                .uri("/users/id/{id}", userId) // Replace with actual endpoint in UserService
                .retrieve()
                .bodyToMono(UserDto.class)
                .block(); // Block only if synchronous behavior is needed
    }
}
