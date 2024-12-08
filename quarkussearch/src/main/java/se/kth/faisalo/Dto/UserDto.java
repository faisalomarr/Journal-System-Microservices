package se.kth.faisalo.Dto;

public class UserDto {
    private Long id;                // Optional, include if needed
    private String username;
    private String role;// Role represented as a String
    private String password;

    // Default constructor
    public UserDto() {}

    // Constructor with parameters
    public UserDto(Long id, String username, String role, String password) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.password = password;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}

