package se.kth.faisalo.messageservice.Dto;
import java.time.LocalDateTime;

public class MessageDto {
    // Optional, include if needed
    private String text;
    private LocalDateTime sentAt;
    private String sender;
    private String receiver;

    // Default constructor
    public MessageDto() {}

    // Constructor with parameters
    public MessageDto(String text, String sender, LocalDateTime sentAt , String receiver) {
        this.text = text;
        this.sentAt = sentAt;
        this.sender = sender;
        this.receiver = receiver;
    }


    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDateTime getSentAt() {
        return sentAt;
    }

    public void setSentAt(LocalDateTime sentAt) {
        this.sentAt = sentAt;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }
}

