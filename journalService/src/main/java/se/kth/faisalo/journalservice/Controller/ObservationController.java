package se.kth.faisalo.journalservice.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import se.kth.faisalo.journalservice.Dto.ObservationDto;
import se.kth.faisalo.journalservice.Service.ObservationService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ObservationController {

    @Autowired
    private ObservationService observationService;

    @PostMapping("/CreateObservation")
    public void createObservation(@RequestBody ObservationDto observationDto ) throws Exception {
        observationService.createObservation(observationDto);
    }

}
