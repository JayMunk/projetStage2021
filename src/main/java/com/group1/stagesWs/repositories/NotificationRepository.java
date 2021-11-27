package com.group1.stagesWs.repositories;

import com.group1.stagesWs.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {

}
