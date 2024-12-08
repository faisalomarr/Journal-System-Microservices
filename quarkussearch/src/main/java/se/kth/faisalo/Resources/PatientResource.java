package se.kth.faisalo.Resources;

import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import se.kth.faisalo.Dto.PatientDto;
import se.kth.faisalo.Entities.Patient;
import se.kth.faisalo.Repositories.PatientRepository;

import java.util.List;

@Path("/patientsQuarkus")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PatientResource {

    @Inject
    PatientRepository patientRepository;

    @GET
    @Path("/by-condition")
    public Uni<List<Patient>> searchPatientsByCondition(@QueryParam("condition") String condition) {
       return patientRepository.searchPatientsByCondition(condition);
    }


    @GET
    @Path("/by-name")
    public Uni<List<Patient>> searchPatientsByName(@QueryParam("name") String name) {
      return patientRepository.searchPatientsByName(name);
    }

    @GET
    @Path("/by-practitioner")
    public Uni<List<Patient>> searchPatientsByPractitioner(@QueryParam("name") String name) {
      return patientRepository.searchPatientsByPractitioner(name);
    }
}


