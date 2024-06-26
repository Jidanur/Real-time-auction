package com.auction.kafka.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.auction.kafka.domain.Auction;
import com.auction.kafka.domain.Response;
import com.auction.kafka.service.AuctionService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping(value = "/auction")
@Slf4j
@CrossOrigin()
public class AuctionController {

    @Autowired
    private AuctionService auctionService;

    @PostMapping("/createauction")
    public ResponseEntity<Response> createUser(@RequestBody Auction auction, UriComponentsBuilder ucBuilder) {
        log.info("create auction---Controller");
        int auctionID = auctionService.createAuction(auction);
        if (auctionID == 0) {
            return new ResponseEntity<Response>(new Response("StartTime should be greater than endTime"),
                    HttpStatus.BAD_REQUEST);
        } else if (auctionID == -1) {
            return new ResponseEntity<Response>(new Response("Seller does not exists"), HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<Response>(new Response("" + auctionID), HttpStatus.CREATED);
        }

    }

    @GetMapping("/getauction/{auctionID}")
    public ResponseEntity<Auction> getAuctionByID(@PathVariable int auctionID) {
        Auction getAuction = auctionService.getAuctionById(auctionID);

        if (getAuction != null) {
            return new ResponseEntity<Auction>(getAuction, HttpStatus.OK);
        } else {
            return new ResponseEntity<Auction>(HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("/all")
    public ResponseEntity<List<Auction>> getAll() {
        List<Auction> allusers = auctionService.getAuctionsList();

        if (allusers != null) {
            return new ResponseEntity<List<Auction>>(allusers, HttpStatus.OK);
        } else {
            return new ResponseEntity<List<Auction>>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/all/mostbids")
    public ResponseEntity<List<Auction>> getMostBids() {
        List<Auction> allusers = auctionService.getMostBidsAuctions();

        if (allusers != null) {
            return new ResponseEntity<List<Auction>>(allusers, HttpStatus.OK);
        } else {
            return new ResponseEntity<List<Auction>>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/all/highbid")
    public ResponseEntity<List<Auction>> getHighestBidAuction() {
        List<Auction> allusers = auctionService.getHighestBidAuction();

        if (allusers != null) {
            return new ResponseEntity<List<Auction>>(allusers, HttpStatus.OK);
        } else {
            return new ResponseEntity<List<Auction>>(HttpStatus.NO_CONTENT);
        }
    }

}
