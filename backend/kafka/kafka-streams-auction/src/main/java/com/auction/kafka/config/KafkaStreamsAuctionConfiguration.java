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

    @Bean
    public NewTopic topicBidRequests() {
        return TopicBuilder.name(KafkaStreamsAuctionTopology.BID_TOPIC).partitions(4).replicas(1).build();
    }

    @Bean
    public NewTopic topicValidBidRequests() {
        return TopicBuilder.name(KafkaStreamsAuctionTopology.VALID_BID_TOPIC).partitions(4).replicas(1).build();
    }
}