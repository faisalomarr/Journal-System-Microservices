package se.kth.faisalo.journalservice.Service;

import se.kth.faisalo.journalservice.Dto.LocationDto;
import se.kth.faisalo.journalservice.Model.Location;

public class LocationService {

    // Convert from entity to DTO
    public LocationDto toDto(Location location) {
        return new LocationDto(
                location.getId(),
                location.getAddress()
        );
    }

    // Convert from DTO to entity
    public Location toEntity(LocationDto locationDto) {
        Location location = new Location();
        location.setId(locationDto.getId());
        location.setAddress(locationDto.getAddress());

        return location;
    }
}

