package com.auction.kafka.topology;

import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.kstream.Consumed;
import org.apache.kafka.streams.kstream.Printed;
import org.apache.kafka.streams.kstream.Produced;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.kafka.support.serializer.JsonSerde;
import org.springframework.stereotype.Component;

import com.auction.kafka.domain.BidRequest;
import com.auction.kafka.service.BidService;

import lombok.extern.slf4j.Slf4j;

@Component
@Profile("kafka")
@Slf4j
public class KafkaStreamsAuctionTopology {
    
    
    public static final String BID_TOPIC = "topic-bid-request";
    public static final String VALID_BID_TOPIC = "valid-bid-requests";

    @Autowired
    private BidService bidService;

    @Autowired
    public void process(StreamsBuilder streamsBuilder){
        
        //filter invalid messages
        var incomingStream = streamsBuilder.stream(BID_TOPIC, Consumed.with(Serdes.String(), new JsonSerde<BidRequest>(BidRequest.class)));

        incomingStream.print(Printed.<String, BidRequest>toSysOut().withLabel(BID_TOPIC));

        var validatebidStream = incomingStream.filter((key, value) -> bidService.validateBid(value));

        validatebidStream.to(VALID_BID_TOPIC, Produced.with(Serdes.String(), new JsonSerde<BidRequest>(BidRequest.class)));
        
        log.info("Kafka Streams Auction Topology created successfully.");

    }
}
