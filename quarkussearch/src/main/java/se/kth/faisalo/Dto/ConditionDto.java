package se.kth.faisalo.Dto;

public class ConditionDto {
    private String name;
    private Long patientId;

    public ConditionDto() {}


    public ConditionDto(String name, Long patientId) {

        this.name = name;
        this.patientId = patientId;
    }



    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }
}
