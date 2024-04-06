package com.auction.kafka.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auction.kafka.dao.AuctionDao;
import com.auction.kafka.domain.Auction;

@Service
public class AuctionService {
    
    @Autowired
    private AuctionDao auctionDao;

    public int createAuction(Auction auction){
        return auctionDao.createAuction(auction);
    }

    public Auction getAuctionById(int id){
        return auctionDao.getAuctionById(id);
    }

    public List<Auction> getAuctionsList(){
        return auctionDao.getAuctionsList();
    }
}
