package com.auction.kafka.repository;

//import org.hibernate.mapping.List;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.auction.kafka.domain.Image;

//@Transactional
//@EnableJpaRepositories
@Repository
// @Service
public interface ImageRepository extends JpaRepository<Image, Integer> {
	Optional<Image> findByName(String name);

	@Query("SELECT i.image FROM Image i WHERE i.auctionID = :auctionID")
	List<byte[]> findImageBytesByAuctionID(@Param("auctionID") int auctionID);
}
