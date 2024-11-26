package se.kth.faisalo.userservice.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.kth.faisalo.userservice.Dto.LoginDto;
import se.kth.faisalo.userservice.Dto.UserDto;
import se.kth.faisalo.userservice.Model.User;
import se.kth.faisalo.userservice.Service.UserService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public UserDto getUser(@RequestBody LoginDto loginDto ) {
        UserDto userDto = userService.Authenticate(loginDto.getUsername(), loginDto.getPassword());
        if (userDto != null) {
            return userDto;
        }
        return null;
    }

    // New getUserByUsername endpoint
    @GetMapping("users/{username}")
    public UserDto getUserByUsername(@PathVariable String username) {
        UserDto userDto = userService.getUserbyUsername(username);
        if (userDto == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with username: " + username);
        }
        return userDto;
    }

    @PostMapping("/create")
    public UserDto CreateUser(@RequestBody UserDto userDto) {
        User user=userService.addUser(userDto);
        return userService.toDto(user);
    }

    @GetMapping("/username{username}")
    public Long getUserId(@RequestParam String username) {
        UserDto userDto = userService.getUserbyUsername(username);
        return userDto.getId();
    }


    @GetMapping("/users/id/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        UserDto userDto = userService.getUserById(id);
        if (userDto == null) {
            return ResponseEntity.notFound().build(); // 404 if user not found
        }
        return ResponseEntity.ok(userDto); // 200 with user data
    }

}
