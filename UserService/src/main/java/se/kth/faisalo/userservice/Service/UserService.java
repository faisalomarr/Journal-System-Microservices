package se.kth.faisalo.userservice.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.kth.faisalo.userservice.Dto.UserDto;
import se.kth.faisalo.userservice.Model.User;
import se.kth.faisalo.userservice.Repository.UserRepository;


import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDto Authenticate(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if(userOptional.isPresent()) {
            User user = userOptional.get();
            if(user.getPassword().equals(password)) {
               return toDto(user);
            }
        }
        return null;
    }

    public UserDto getUserbyUsername(String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        return userOptional.map(this::toDto).orElse(null);
    }

    public UserDto getUserById(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.map(this::toDto).orElse(null); // Maps the User to UserDto if present
    }

    public User addUser(UserDto userDto) {
        User user = toEntity(userDto);
        Optional<User> userOptional = userRepository.findByUsername(userDto.getUsername());
        if(userOptional.isEmpty()) {
            return userRepository.save(user);
        }
        return null;
    }

    // Convert from entity to DTO
    public UserDto toDto(User user) {
        return new UserDto(
                user.getId(),
                user.getUsername(),
                user.getRole() != null ? user.getRole().name() : null, // Convert Role enum to String
                user.getPassword()
        );
    }

    // Convert from DTO to entity (password handling may vary based on application security needs)
    public User toEntity(UserDto userDto) {
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setPassword(userDto.getPassword()); // Password should be set securely in actual applications
        user.setRole(userDto.getRole() != null ? User.Role.valueOf(userDto.getRole()) : null); // Convert String to Role enum

        return user;
    }
}
