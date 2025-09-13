package com.gamai.repository;

import com.gamai.model.Assessment;
import com.gamai.model.AssessmentSubmission;
import com.gamai.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssessmentSubmissionRepository extends JpaRepository<AssessmentSubmission, Long> {
    
    List<AssessmentSubmission> findByAssessment(Assessment assessment);
    
    List<AssessmentSubmission> findByStudent(User student);
    
    Optional<AssessmentSubmission> findByAssessmentAndStudent(Assessment assessment, User student);
    
    @Query("SELECT s FROM AssessmentSubmission s WHERE s.status = :status")
    List<AssessmentSubmission> findByStatus(@Param("status") AssessmentSubmission.Status status);
    
    @Query("SELECT s FROM AssessmentSubmission s JOIN s.assessment a WHERE a.createdBy = :teacher")
    List<AssessmentSubmission> findSubmissionsByTeacher(@Param("teacher") User teacher);
    
    @Query("SELECT AVG(s.percentage) FROM AssessmentSubmission s WHERE s.student = :student")
    Double findAverageScoreByStudent(@Param("student") User student);
    
    @Query("SELECT COUNT(s) FROM AssessmentSubmission s WHERE s.student = :student")
    Long countSubmissionsByStudent(@Param("student") User student);
}