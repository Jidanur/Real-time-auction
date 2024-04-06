package com.auction.kafka.service;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.auction.kafka.domain.Auction;
import com.auction.kafka.domain.BidRequest;
import com.auction.kafka.domain.User;
import com.auction.kafka.topology.KafkaStreamsAuctionTopology;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class BidService {
    

    @Autowired
    private KafkaTemplate<String, BidRequest> kafkaTemplate;

    @Autowired
    private AuctionService auctionService;

    @Autowired
    private UserService userService;

    public void placeBid(BidRequest bid) throws Exception{
        bid.setTimeOfBid(new Timestamp(System.currentTimeMillis()));
        log.info("message sent", bid.toString());
        kafkaTemplate.send(KafkaStreamsAuctionTopology.BID_TOPIC,bid);
    }

    public Boolean validateBid(BidRequest bid){
        Boolean valid = false;

        User bid_user = userService.findbyId(bid.getBidderID());
        Auction bid_auction = auctionService.getAuctionById(bid.getAuctionID());

        if(bid_user != null && bid_auction != null && bid.getBidPrice()>0){
            valid = true;
        }

        return valid;
    }
}
