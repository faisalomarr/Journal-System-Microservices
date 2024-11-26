package se.kth.faisalo.journalservice.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.kth.faisalo.journalservice.Dto.PatientDto;
import se.kth.faisalo.journalservice.Model.Patient;
import se.kth.faisalo.journalservice.Service.PatientService;


import java.util.List;

@RestController
@RequestMapping("/patientinfo")
public class PatientController {

    @Autowired
    private PatientService patientService;


    @GetMapping("/{id}")
    public PatientDto getPatientByUserId(@PathVariable Long id) {
        return patientService.getPatientById(id);
    }

    @GetMapping("/all")
    public List<PatientDto> getAllPatients() {
        return patientService.getPatients();
    }


    @PostMapping("/createpatient")
    public ResponseEntity<?> createPatient(@RequestBody PatientDto patientDto) {
        try {
            Patient patient = patientService.createPatient(patientDto);
            PatientDto responseDto = patientService.toDto(patient);
            return ResponseEntity.ok(responseDto); // Return 200 OK with patient data
        } catch (Exception e) {
            // Log the exception for debugging purposes
            e.printStackTrace();
            // Return an error response with a meaningful message
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while creating the patient.");
        }
    }


}
