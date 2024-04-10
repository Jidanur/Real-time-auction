package com.auction.kafka.kafkaListener;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.auction.kafka.domain.BidRequest;
import com.auction.kafka.service.AuctionService;
import com.auction.kafka.topology.KafkaStreamsAuctionTopology;

import lombok.extern.slf4j.Slf4j;

@Component
@Profile("kafka")
@Slf4j
public class BidListener {
    
    @Autowired
    AuctionService auctionService;

    ///listens the bid requests from 4 different topics concurrently each open a new thread
    @KafkaListener(topics= KafkaStreamsAuctionTopology.VALID_BID_TOPIC , containerFactory= "bidKafkaListenerContainerFactory", concurrency ="4")
    public void listener(BidRequest bid){
        auctionService.placeBid_auction(bid);
        log.info("Received bid for $"+ bid.getBidPrice());
    }
    
}
