package se.kth.faisalo.journalservice.Model;

import jakarta.persistence.*;


@Entity
public class Practitioner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String jobTitle;

    @Column(unique = true, nullable = false)
    private Long userId;


    public Practitioner() {

    }

    public Practitioner(String firstName, Long id, String lastName, String jobTitle,Long user) {
        this.firstName = firstName;
        this.id = id;
        this.lastName = lastName;
        this.jobTitle = jobTitle;
        this.userId = user;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
