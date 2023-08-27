package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Services;

public interface ServiceRepository extends JpaRepository<Services, Integer> {

	Optional<Services> findByServiceName(String name);
}
