package com.auction.kafka.domain;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.hibernate.annotations.CacheConcurrencyStrategy;

import jakarta.persistence.Cacheable;
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
@Cacheable
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Getter
@Setter
@Table(name = "auction_table")
public class Auction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int auctionID;

    // @Transient
    private List<String> recentBids = new ArrayList<>();

    @Column(name = "sellerID", nullable = false)
    private int sellerID;

    @Column(name = "winnerID"/* , columnDefinition = "DEFAULT 0" */)
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

    public void addBid(String currentBid) {
        numOfBids++;
        recentBids.add(currentBid);
    }

    public void setDefaultValues() {
        // currentBid = 0;
        // numOfBids = 0;
        // winnerID = 0;

        if (auctionDescription == null) {
            auctionDescription = "";
        }
        if (finalPrice == null) {
            finalPrice = initialPrice;
        }
        if (imageName == null) {
            imageName = "";
        }
        if (currentBid == null) {
            currentBid = initialPrice;
        }
    }

    public Boolean validateTime() {
        Boolean valid = false;

        if (startTime == null) { // default value for start time
            startTime = new Timestamp(System.currentTimeMillis());
        }

        if (endTime == null) { /// default value for endTime 10 mins after start
            Calendar calendar = Calendar.getInstance();
            calendar.setTimeInMillis(startTime.getTime());
            calendar.add(Calendar.MINUTE, 10);
            endTime = new Timestamp(calendar.getTimeInMillis());
            valid = true;
        } else if (startTime.compareTo(endTime) < 0) {
            valid = true;
        }

        return valid;

    }

}
