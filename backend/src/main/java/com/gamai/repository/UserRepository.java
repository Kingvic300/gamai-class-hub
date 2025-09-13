package com.gamai.repository;

import com.gamai.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    List<User> findByRole(User.Role role);
    
    Page<User> findByRole(User.Role role, Pageable pageable);
    
    @Query("SELECT u FROM User u WHERE u.role = :role AND u.isApproved = :isApproved")
    List<User> findByRoleAndIsApproved(@Param("role") User.Role role, @Param("isApproved") Boolean isApproved);
    
    @Query("SELECT u FROM User u WHERE u.isApproved = false ORDER BY u.createdAt ASC")
    List<User> findPendingApprovals();
    
    @Query("SELECT u FROM User u WHERE u.fullName LIKE %:search% OR u.email LIKE %:search%")
    Page<User> searchUsers(@Param("search") String search, Pageable pageable);
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.role = :role")
    Long countByRole(@Param("role") User.Role role);
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.isActive = true")
    Long countActiveUsers();
}