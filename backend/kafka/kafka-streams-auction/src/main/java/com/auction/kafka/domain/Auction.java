package com.auction.kafka.domain;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name= "auction_table")
public class Auction {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int auctionID;

    @Column(name="sellerID", nullable = false)
    private int sellerID;

    @Column(name = "winnerID", columnDefinition = "DEFAULT -1")
    private int winnerID;

    @Column(name = "auction_title", length = 200)
    private String auctionTitle;

    @Column(name = "auction_description", columnDefinition = "TEXT")
    private String auctionDescription;

    @Column(name = "imageName", length = 200)
    private String imageName;

    @Column(name = "numOfBids", columnDefinition = "INTEGER DEFAULT 0")
    private Integer numOfBids;

    @Column(name = "initial_price")
    private Integer initialPrice;

    @Column(name = "current_bid", columnDefinition = "INTEGER DEFAULT 0")
    private Integer currentBid;

    @Column(name = "final_price", columnDefinition = "INTEGER DEFAULT -1")
    private Integer finalPrice;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "start_time", nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp startTime;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "end_time")
    private Timestamp endTime;
}
