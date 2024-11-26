package se.kth.faisalo.journalservice.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import se.kth.faisalo.journalservice.Dto.PractitionerDto;
import se.kth.faisalo.journalservice.Model.Practitioner;
import se.kth.faisalo.journalservice.Service.PractitionerService;


@RestController
public class PractitionerController {

    @Autowired
    private PractitionerService practitionerService;

    @PostMapping("createpractitioner")
    public PractitionerDto createPractitioner(@RequestBody PractitionerDto practitionerDto) {
        Practitioner practitioner = practitionerService.createPractitioner(practitionerDto);
        return practitionerService.toDto(practitioner);
    }

}
