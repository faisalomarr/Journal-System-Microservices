package se.kth.faisalo.journalservice.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import se.kth.faisalo.journalservice.Dto.PractitionerDto;
import se.kth.faisalo.journalservice.Dto.UserDto;
import se.kth.faisalo.journalservice.Model.Practitioner;
import se.kth.faisalo.journalservice.Repository.PractitionerRepository;


import java.util.Optional;

@Service
public class PractitionerService {

    PractitionerRepository practitionerRepository;
    WebClient webClient;


    public PractitionerService(PractitionerRepository practitionerRepository) {
        this.practitionerRepository = practitionerRepository;
        this.webClient = WebClient.builder().baseUrl("http://localhost:8082").build();
    }

    public Practitioner createPractitioner(PractitionerDto practitionerDto) {
        UserDto user = getUserFromUserServiceById(practitionerDto.getUserId());
        if (user!=null) {
            return practitionerRepository.save(toEntity(practitionerDto, user));
        }
        return null;
    }

    // Convert from entity to DTO
    public PractitionerDto toDto(Practitioner practitioner) {
        return new PractitionerDto(
                practitioner.getId(),
                practitioner.getFirstName(),
                practitioner.getLastName(),
                practitioner.getJobTitle(),
                practitioner.getUserId()
        );
    }

    // Convert from DTO to entity
    public Practitioner toEntity(PractitionerDto practitionerDto, UserDto user) {
        Practitioner practitioner = new Practitioner();
        practitioner.setId(practitionerDto.getId());
        practitioner.setFirstName(practitionerDto.getFirstName());
        practitioner.setLastName(practitionerDto.getLastName());
        practitioner.setJobTitle(practitionerDto.getJobTitle());
        practitioner.setUserId(user.getId());

        return practitioner;
    }

    public UserDto getUserFromUserServiceById(Long userId) {
        return webClient.get()
                .uri("/users/id/{id}", userId) // Replace with actual endpoint in UserService
                .retrieve()
                .bodyToMono(UserDto.class)
                .block(); // Block only if synchronous behavior is needed
    }
}

