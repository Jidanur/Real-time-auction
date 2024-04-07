package com.auction.kafka.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.auction.kafka.domain.Image;

//@Transactional
@EnableJpaRepositories
@Repository
// @Service
public interface ImageRepository extends JpaRepository<Image, Long> {
	Optional<Image> findByName(String name);
}
