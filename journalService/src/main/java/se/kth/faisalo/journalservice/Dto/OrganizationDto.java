package se.kth.faisalo.journalservice.Dto;

public class OrganizationDto {
    private Long id;                // Optional, include if needed
    private String name;
    private Long locationId;        // Reference to Location by ID

    // Default constructor
    public OrganizationDto() {}

    // Constructor with parameters
    public OrganizationDto(Long id, String name, Long locationId) {
        this.id = id;
        this.name = name;
        this.locationId = locationId;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }
}

