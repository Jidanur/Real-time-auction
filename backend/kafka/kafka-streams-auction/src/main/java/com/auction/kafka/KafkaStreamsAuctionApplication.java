package com.auction.kafka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;

@SpringBootApplication(exclude = {JpaRepositoriesAutoConfiguration.class, HibernateJpaAutoConfiguration.class})
//@EnableKafkaStreams
public class KafkaStreamsAuctionApplication {

	public static void main(String[] args) {
		SpringApplication.run(KafkaStreamsAuctionApplication.class, args);
	}

}
