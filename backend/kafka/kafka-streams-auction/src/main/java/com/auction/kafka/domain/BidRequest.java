package com.auction.kafka.domain;

import java.sql.Timestamp;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class BidRequest {
    
    private int bidderID;
    
    private int auctionID;

    private int bidPrice;

    private Timestamp timeOfBid;
}
