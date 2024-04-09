package com.auction.kafka.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages ="com.auction.kafka.dao.ImageRepository")
//@EnableTransactionManagement
public class RepositoryConfig {
    
}
