package se.kth.faisalo.journalservice.Service;


import se.kth.faisalo.journalservice.Dto.OrganizationDto;
import se.kth.faisalo.journalservice.Model.Location;
import se.kth.faisalo.journalservice.Model.Organization;

public class OrganizationService {

    // Convert from entity to DTO
    public OrganizationDto toDto(Organization organization) {
        return new OrganizationDto(
                organization.getId(),
                organization.getName(),
                organization.getLocation() != null ? organization.getLocation().getId() : null
        );
    }

    // Convert from DTO to entity
    public Organization toEntity(OrganizationDto organizationDto, Location location) {
        Organization organization = new Organization();
        organization.setId(organizationDto.getId());
        organization.setName(organizationDto.getName());
        organization.setLocation(location);

        return organization;
    }
}

