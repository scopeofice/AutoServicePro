package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	Optional <User> findByEmail(String email);
	Optional<User> findByEmailAndPassword(String email,String password);

}
