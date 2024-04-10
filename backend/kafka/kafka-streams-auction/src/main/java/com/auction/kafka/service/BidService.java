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


    /// send bid-request to kafka with <key,value> = <auctionID, Bid>
    public void placeBid(BidRequest bid) throws Exception{
        bid.setTimeOfBid(new Timestamp(System.currentTimeMillis()));
        log.info("Bid-request sent to Kafka", bid.toString());
        kafkaTemplate.send(KafkaStreamsAuctionTopology.BID_TOPIC,String.valueOf(bid.getAuctionID()),bid);
    }

    public BidRequest getLastBid(int auctionID){
        BidRequest lastBidRequest = new BidRequest();
        Auction curr = auctionService.getAuctionById(auctionID);
        lastBidRequest.setAuctionID(auctionID);
        if(curr == null){
            return null;
        }
        else{
            String lastBid = curr.getLastBid();
            if(!lastBid.isEmpty()){
                String[] seperate = lastBid.split(",");
                lastBidRequest.setBidderID(Integer.parseInt(seperate[0]));
                lastBidRequest.setBidPrice(Integer.parseInt(seperate[1]));
                lastBidRequest.setTimeOfBid(new Timestamp(Long.parseLong(seperate[2])));
            }
        }
        return lastBidRequest;
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
