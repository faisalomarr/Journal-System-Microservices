package se.kth.faisalo.journalservice.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import se.kth.faisalo.journalservice.Dto.ObservationDto;
import se.kth.faisalo.journalservice.Dto.UserDto;
import se.kth.faisalo.journalservice.Model.Observation;
import se.kth.faisalo.journalservice.Repository.ObservationRepository;

import java.util.Optional;

@Service
public class ObservationService {

    ObservationRepository ObservationRepository;
    private final WebClient webClient;

    public ObservationService(ObservationRepository ObservationRepository, WebClient webClient) {
        this.ObservationRepository =  ObservationRepository;
        this.webClient = WebClient.builder()
                .baseUrl("http://users-service:8082")  // Internal communication
                .build();
    }

    public void createObservation(ObservationDto observationDto) throws Exception{
        UserDto patient= getUserFromUserService(observationDto.getPatient());
        UserDto practitioner = getUserFromUserService(observationDto.getPractitioner());


        if (patient!=null && practitioner!=null) {

            if ("PATIENT".equalsIgnoreCase(patient.getRole())) {
                Observation observation = toEntity(observationDto,patient,practitioner);
                ObservationRepository.save(observation);
            } else {
                throw new Exception("Observation must be sent to a patient");
            }
        } else {
            throw new Exception("User not found with username: " + observationDto.getPatient());
        }
    }



    // Convert from entity to DTO
    public ObservationDto toDto(Observation observation) {
       UserDto patient= getUserFromUserServiceById(observation.getPatientId());
       UserDto practitioner= getUserFromUserServiceById(observation.getPractitionerId());

        return new ObservationDto(
                observation.getId(),
                observation.getDescription(),
                observation.getTimeOfObservation(),
                patient.getUsername(),
                practitioner.getUsername()
        );
    }

    // Convert from DTO to entity
    public Observation toEntity(ObservationDto observationDto, UserDto patient,UserDto practitioner ) {
        Observation observation = new Observation();
        observation.setId(observationDto.getId());
        observation.setDescription(observationDto.getDescription());
        observation.setTimeOfObservation(observationDto.getTimeOfObservation());
        observation.setPatientId(patient.getId());
        observation.setPractitionerId(practitioner.getId());

        return observation;
    }

    public UserDto getUserFromUserService(String username) {
        return webClient.get()
                .uri("/users/{username}", username)
                .retrieve()
                .bodyToMono(UserDto.class) // Reactive way to handle the response
                .block(); // Block the call if you want a synchronous result
    }


    // Helper method to fetch UserDto by ID
    public UserDto getUserFromUserServiceById(Long userId) {
        return webClient.get()
                .uri("/users/id/{id}", userId) // Replace with actual endpoint in UserService
                .retrieve()
                .bodyToMono(UserDto.class)
                .block(); // Block only if synchronous behavior is needed
    }
}

