package com.gamai.repository;

import com.gamai.model.Notification;
import com.gamai.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    
    List<Notification> findByRecipient(User recipient);
    
    Page<Notification> findByRecipient(User recipient, Pageable pageable);
    
    @Query("SELECT n FROM Notification n WHERE n.recipient = :recipient AND n.isRead = false ORDER BY n.createdAt DESC")
    List<Notification> findUnreadByRecipient(@Param("recipient") User recipient);
    
    @Query("SELECT COUNT(n) FROM Notification n WHERE n.recipient = :recipient AND n.isRead = false")
    Long countUnreadByRecipient(@Param("recipient") User recipient);
    
    @Query("SELECT n FROM Notification n WHERE n.type = :type")
    List<Notification> findByType(@Param("type") Notification.Type type);
    
    @Query("SELECT n FROM Notification n WHERE n.isEmailSent = false")
    List<Notification> findPendingEmailNotifications();
    
    List<Notification> findBySender(User sender);
}