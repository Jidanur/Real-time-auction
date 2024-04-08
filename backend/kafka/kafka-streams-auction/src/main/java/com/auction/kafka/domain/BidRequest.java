package com.auction.kafka.domain;

import java.sql.Timestamp;

import org.springframework.context.annotation.Profile;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Profile("kafka")
public class BidRequest {
    
    @JsonProperty("bidderID")
    private int bidderID;
    
    @JsonProperty("auctionID")
    private int auctionID;

    @JsonProperty("bidPrice")
    private int bidPrice;

    @JsonProperty("timeOfBid")
    private Timestamp timeOfBid;

    public BidRequest(){

    }

    public String toString(){
        String ret = "bidderId:" + this.bidderID + ", auctionID:" + this.auctionID + ", bid:$"+this.bidPrice+ ", time:"+ this.timeOfBid;
        return ret;
    }
}
