package se.kth.faisalo.Dto;


public class LocationDto {
    private Long id;           // Optional, include if needed
    private String address;

    public LocationDto() {}


    public LocationDto(Long id, String address) {
        this.id = id;
        this.address = address;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
