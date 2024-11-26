package se.kth.faisalo.messageservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.kth.faisalo.messageservice.Model.Message;


import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByReceiver(String receiver);
}
