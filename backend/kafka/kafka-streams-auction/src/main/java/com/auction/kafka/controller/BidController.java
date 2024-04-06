package com.auction.kafka.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auction.kafka.domain.BidRequest;
import com.auction.kafka.service.BidService;

import lombok.extern.slf4j.Slf4j;


@RestController
@RequestMapping(value = "/bid")
@Slf4j
public class BidController {

    @Autowired
    private BidService bidService;

    @PostMapping("/placebid")
    public ResponseEntity<BidRequest> postMethodName(@RequestBody BidRequest bid) {
        log.info("Placing a bid of $" + bid.getBidPrice());
        try{
            bidService.placeBid(bid);
            return new ResponseEntity<BidRequest>(HttpStatus.OK);
        }
        catch(Exception ex){
            log.error("Could place the Bid for userID:"+bid.getBidderID() , ex);
            return new ResponseEntity<BidRequest>(HttpStatus.BAD_REQUEST);
        }
        
    }
    
    
}
