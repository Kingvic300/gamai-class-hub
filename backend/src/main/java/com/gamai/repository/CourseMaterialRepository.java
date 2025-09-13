package com.gamai.repository;

import com.gamai.model.ClassBooking;
import com.gamai.model.CourseMaterial;
import com.gamai.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseMaterialRepository extends JpaRepository<CourseMaterial, Long> {
    
    List<CourseMaterial> findByClassBooking(ClassBooking classBooking);
    
    List<CourseMaterial> findByUploadedBy(User uploadedBy);
    
    Page<CourseMaterial> findByUploadedBy(User uploadedBy, Pageable pageable);
    
    @Query("SELECT cm FROM CourseMaterial cm WHERE cm.title LIKE %:search% OR cm.description LIKE %:search%")
    Page<CourseMaterial> searchMaterials(@Param("search") String search, Pageable pageable);
    
    @Query("SELECT cm FROM CourseMaterial cm WHERE cm.fileType = :fileType")
    List<CourseMaterial> findByFileType(@Param("fileType") String fileType);
    
    @Query("SELECT cm FROM CourseMaterial cm JOIN cm.classBooking cb WHERE cb.subject = :subject")
    List<CourseMaterial> findBySubject(@Param("subject") String subject);
    
    @Query("SELECT cm FROM CourseMaterial cm ORDER BY cm.downloadCount DESC")
    List<CourseMaterial> findMostDownloaded(Pageable pageable);
}