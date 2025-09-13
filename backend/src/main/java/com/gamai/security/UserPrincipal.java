package com.gamai.security;

import com.gamai.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class UserPrincipal implements UserDetails {
    private Long id;
    private String fullName;
    private String email;
    private String password;
    private User.Role role;
    private Boolean isActive;
    private Boolean isApproved;

    public UserPrincipal(Long id, String fullName, String email, String password, 
                        User.Role role, Boolean isActive, Boolean isApproved) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.isActive = isActive;
        this.isApproved = isApproved;
    }

    public static UserPrincipal create(User user) {
        return new UserPrincipal(
            user.getId(),
            user.getFullName(),
            user.getEmail(),
            user.getPassword(),
            user.getRole(),
            user.getIsActive(),
            user.getIsApproved()
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return isActive;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isActive && isApproved;
    }

    // Getters
    public Long getId() { return id; }
    public String getFullName() { return fullName; }
    public String getEmail() { return email; }
    public User.Role getRole() { return role; }
    public Boolean getIsActive() { return isActive; }
    public Boolean getIsApproved() { return isApproved; }
}