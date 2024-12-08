package se.kth.faisalo.messageservice.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import se.kth.faisalo.messageservice.Dto.MessageDto;
import se.kth.faisalo.messageservice.Dto.UserDto;
import se.kth.faisalo.messageservice.Model.Message;
import se.kth.faisalo.messageservice.Repository.MessageRepository;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    WebClient webClient;
    MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
        this.webClient = WebClient.builder()
                .baseUrl("http://users-service:8082")  // Internal communication
                .build();
    }

    public void sendMessage(MessageDto messageDto) throws Exception {
        UserDto userR = getUserFromUserService(messageDto.getReceiver());
        UserDto userS = getUserFromUserService(messageDto.getSender());

        if ("PATIENT".equalsIgnoreCase(userS.getRole()) && userR!=null) {

            if ("PRACTITIONER".equalsIgnoreCase(userR.getRole()) || "STAFF".equalsIgnoreCase(userR.getRole())) {
                Message message = toEntity(messageDto, userS, userR);
                messageRepository.save(message);
            } else {
                throw new Exception("Patients can only send messages to Staff or Practitioners.");
            }
        } else if (userR!=null) {

            Message message = toEntity(messageDto, userS, userR);
            messageRepository.save(message);
        }
    }



    public List<MessageDto> getAllYourMessages(String username) {
        String receiver= getUserFromUserService(username).getUsername();
        List<Message> receivedMessages = messageRepository.findByReceiver(receiver);
        List<MessageDto> messageDtos = new ArrayList<>();
        for (Message message : receivedMessages) {
            messageDtos.add(toDto(message));
        }
        return messageDtos;
    }




    // Convert from entity to DTO
    public MessageDto toDto(Message message) {
        return new MessageDto(
                message.getText(),
                message.getSender(),
                message.getSentAt(),
                message.getReceiver()
        );
    }

    // Convert from DTO to entity
    public Message toEntity(MessageDto messageDto, UserDto sender, UserDto receiver) {
        Message message = new Message();
        message.setText(messageDto.getText());
        message.setSentAt(LocalDateTime.now());
        message.setSender(sender.getUsername());
        message.setReceiver(receiver.getUsername());

        return message;
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

