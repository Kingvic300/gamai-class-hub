package com.gamai.repository;

import com.gamai.model.Assessment;
import com.gamai.model.ClassBooking;
import com.gamai.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AssessmentRepository extends JpaRepository<Assessment, Long> {
    
    List<Assessment> findByClassBooking(ClassBooking classBooking);
    
    List<Assessment> findByCreatedBy(User createdBy);
    
    Page<Assessment> findByCreatedBy(User createdBy, Pageable pageable);
    
    @Query("SELECT a FROM Assessment a WHERE a.isActive = true")
    List<Assessment> findActiveAssessments();
    
    @Query("SELECT a FROM Assessment a WHERE a.dueDate >= :now AND a.isActive = true ORDER BY a.dueDate ASC")
    List<Assessment> findUpcomingAssessments(@Param("now") LocalDateTime now);
    
    @Query("SELECT a FROM Assessment a WHERE a.title LIKE %:search% OR a.description LIKE %:search%")
    Page<Assessment> searchAssessments(@Param("search") String search, Pageable pageable);
    
    @Query("SELECT a FROM Assessment a JOIN a.classBooking cb WHERE cb.subject = :subject")
    List<Assessment> findBySubject(@Param("subject") String subject);
}