package se.kth.faisalo.Dto;

public class PractitionerDto {
    private Long id;               // Optional, include if needed
    private String firstName;
    private String lastName;
    private String jobTitle;
    private Long userId;

    // Default constructor
    public PractitionerDto() {}

    // Constructor with parameters
    public PractitionerDto(Long id, String firstName, String lastName, String jobTitle,Long userId) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.jobTitle = jobTitle;
        this.userId = userId;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
