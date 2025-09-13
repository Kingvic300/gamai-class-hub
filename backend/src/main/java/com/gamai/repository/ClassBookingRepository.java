package com.gamai.repository;

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
public interface ClassBookingRepository extends JpaRepository<ClassBooking, Long> {
    
    List<ClassBooking> findByTeacher(User teacher);
    
    Page<ClassBooking> findByTeacher(User teacher, Pageable pageable);
    
    @Query("SELECT cb FROM ClassBooking cb JOIN cb.enrolledStudents s WHERE s = :student")
    List<ClassBooking> findByEnrolledStudent(@Param("student") User student);
    
    @Query("SELECT cb FROM ClassBooking cb WHERE cb.startTime >= :startTime AND cb.startTime <= :endTime")
    List<ClassBooking> findByDateRange(@Param("startTime") LocalDateTime startTime, 
                                      @Param("endTime") LocalDateTime endTime);
    
    @Query("SELECT cb FROM ClassBooking cb WHERE cb.subject = :subject")
    List<ClassBooking> findBySubject(@Param("subject") String subject);
    
    @Query("SELECT cb FROM ClassBooking cb WHERE cb.status = :status")
    List<ClassBooking> findByStatus(@Param("status") ClassBooking.Status status);
    
    @Query("SELECT cb FROM ClassBooking cb WHERE cb.title LIKE %:search% OR cb.subject LIKE %:search%")
    Page<ClassBooking> searchClasses(@Param("search") String search, Pageable pageable);
    
    @Query("SELECT cb FROM ClassBooking cb WHERE cb.startTime >= :now AND cb.status = 'SCHEDULED' ORDER BY cb.startTime ASC")
    List<ClassBooking> findUpcomingClasses(@Param("now") LocalDateTime now);
    
    @Query("SELECT cb FROM ClassBooking cb WHERE cb.startTime <= :now AND cb.endTime >= :now AND cb.status = 'SCHEDULED'")
    List<ClassBooking> findLiveClasses(@Param("now") LocalDateTime now);
}