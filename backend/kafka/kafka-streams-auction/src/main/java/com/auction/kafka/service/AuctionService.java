package com.auction.kafka.service;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auction.kafka.dao.AuctionDao;
import com.auction.kafka.domain.Auction;
import com.auction.kafka.domain.BidRequest;
import com.auction.kafka.domain.User;

@Service
public class AuctionService {
    
    @Autowired
    private AuctionDao auctionDao;

    @Autowired
    private UserService userService;

    public int createAuction(Auction auction){
        return auctionDao.createAuction(auction);
    }

    public Auction getAuctionById(int id){
        return auctionDao.getAuctionById(id);
    }

    public List<Auction> getAuctionsList(){
        return auctionDao.getAuctionsList();
    }

    public void placeBid_auction(BidRequest bid){
        Auction currentAuction = getAuctionById(bid.getAuctionID());
        Timestamp bid_time = bid.getTimeOfBid();
        Timestamp auction_end_time = currentAuction.getEndTime();
        int bidPrice = bid.getBidPrice();
        int currentBid = currentAuction.getCurrentBid();
        User bidder = userService.findbyId(bid.getBidderID());

        if(auction_end_time.compareTo(bid_time) >= 0 && bidPrice> currentBid){
            currentAuction.setCurrentBid(bidPrice);
            currentAuction.setWinnerID(bid.getBidderID());
            currentAuction.addBid(""+bidder.getUserName()+"-"+bidPrice);
            auctionDao.UpdateAuctionBid(currentAuction);
        }

    }
}
