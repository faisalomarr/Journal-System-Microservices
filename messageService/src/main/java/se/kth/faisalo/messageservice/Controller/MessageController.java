package se.kth.faisalo.messageservice.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import se.kth.faisalo.messageservice.Dto.MessageDto;
import se.kth.faisalo.messageservice.Service.MessageService;


import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MessageController {

    @Autowired
    private MessageService messageService;


    @PostMapping("/messageSend")
    public void sendMessagePatient(@RequestBody MessageDto messageDto ) throws Exception {
        messageService.sendMessage(messageDto);
    }

    @GetMapping("/messages")
    public List<MessageDto> getMessages(@RequestParam String username ) throws Exception {
        return messageService.getAllYourMessages(username);
    }


}
