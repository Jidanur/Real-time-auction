package com.auction.kafka.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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
    public ResponseEntity<Auction> createUser(@RequestBody Auction auction, UriComponentsBuilder ucBuilder) {
        log.info("create auction---Controller");
        int auctionID = auctionService.createAuction(auction);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/auction/getauction/{id}").buildAndExpand(auctionID).toUri());
        return new ResponseEntity<Auction>(headers, HttpStatus.CREATED);
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

}
