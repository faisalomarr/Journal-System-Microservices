package se.kth.faisalo.Resources;

import io.quarkus.hibernate.reactive.panache.PanacheEntityBase;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import se.kth.faisalo.Entities.Encounter;
import se.kth.faisalo.Repositories.EncounterRepository;

import java.util.List;

@Path("/encounterQuarkus")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EncounterResource {

    @Inject
    EncounterRepository encounterRepository;

    @GET
    @Path("/by-practitioner")
    public Uni<List<Encounter>> searchEncounters(@QueryParam("name") String name) {
      return encounterRepository.searchEncounters(name);
    }




}


