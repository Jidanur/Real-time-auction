package com.auction.kafka.topology;

import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.kstream.Consumed;
import org.apache.kafka.streams.kstream.Printed;
import org.apache.kafka.streams.kstream.Produced;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Component
@Profile("kafka")
@Slf4j
public class KafkaStreamsAuctionTopology {
    
    
    public static final String[] TOPICS = {"topic-requests", "topic-bid-request", "topic-db-request"};

    public static String[] getTopics(){
        return TOPICS;
    }

    @Autowired
    public void process(StreamsBuilder streamsBuilder){

        var generalStream = streamsBuilder.stream(TOPICS[0], Consumed.with(Serdes.String(), Serdes.String()));

        generalStream.print(Printed.<String, String>toSysOut().withLabel(TOPICS[0]));

        var bidStream = generalStream.filter((key, value) -> value.contains("BID"));
        var dbStream = generalStream.filter((key, value) -> value.contains("DB"));

        bidStream.to(TOPICS[1], Produced.with(Serdes.String(), Serdes.String()));
        dbStream.to(TOPICS[2], Produced.with(Serdes.String(), Serdes.String()));

        log.info("Kafka Streams Auction Topology created successfully.");

    }
}
