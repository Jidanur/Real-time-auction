package com.auction.kafka.config;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaRepositories(basePackages ="com.auction.kafka.dao.ImageRepository")
//@EnableTransactionManagement
public class RepositoryConfig {
    
}
