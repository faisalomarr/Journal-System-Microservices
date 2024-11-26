package se.kth.faisalo.userservice.Dto;

public class LoginDto {

    private String username;
    private String password;

    public LoginDto(String password, String username) {
        this.password = password;
        this.username = username;
    }

    public LoginDto() {

    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
