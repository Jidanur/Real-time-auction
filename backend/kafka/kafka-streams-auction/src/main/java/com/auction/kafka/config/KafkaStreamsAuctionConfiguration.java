package com.auction.kafka.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.kafka.config.TopicBuilder;

import com.auction.kafka.topology.KafkaStreamsAuctionTopology;

@Configuration
@Profile("kafka")
public class KafkaStreamsAuctionConfiguration {

    
    public static final String[] TOPICS= KafkaStreamsAuctionTopology.getTopics();


    @Bean
    public NewTopic topicRequests() {
        return TopicBuilder.name(TOPICS[0]).partitions(4).replicas(1).build();
    }

    @Bean
    public NewTopic topicBidRequests() {
        return TopicBuilder.name(TOPICS[1]).partitions(4).replicas(1).build();
    }

    @Bean
    public NewTopic topicDbRequests() {
        return TopicBuilder.name(TOPICS[2]).partitions(4).replicas(1).build();
    }
}