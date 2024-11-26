package se.kth.faisalo.journalservice.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import se.kth.faisalo.journalservice.Dto.ConditionDto;
import se.kth.faisalo.journalservice.Model.Condition;
import se.kth.faisalo.journalservice.Service.ConditionService;

import java.util.List;

@RestController
@RequestMapping("/conditions")
public class ConditionController {

    @Autowired
    private ConditionService conditionService;

    @GetMapping("/patient/{patientId}")
    public List<ConditionDto> getConditionsByPatientId(@PathVariable Long patientId) {
        return conditionService.getConditions(patientId);
    }

    @PostMapping("/addcondition")
    public ConditionDto addCondition(@RequestBody ConditionDto conditionDto) {
        try {
            Condition condition=conditionService.addCondition(conditionDto);
            return conditionService.toDto(condition);
        } catch (Exception e) {
            return null;
        }
    }


}
