package com.auction.kafka.controller;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter.SseEventBuilder;

import com.auction.kafka.domain.BidRequest;
import com.auction.kafka.service.BidService;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;


@RestController
@RequestMapping(value = "/bid")
@Slf4j
// @CrossOrigin()
public class BidController {

    @Autowired
    private BidService bidService;

    private final ExecutorService executor = Executors.newSingleThreadExecutor();

    @PostConstruct
    public void init(){
        Runtime.getRuntime().addShutdownHook(new Thread(() ->{
            executor.shutdown();
            try{
                executor.awaitTermination(5, TimeUnit.SECONDS);
            }
            catch (Exception ex){
                log.error("exception happened in post construct executor -- Bid Controller", ex);
            }

        }));
    }

    @GetMapping("/getbid/{auctionID}")
    public SseEmitter getAuctionBid(@PathVariable int auctionID) {
        SseEmitter emitter = new SseEmitter();

        emitter.onCompletion(()-> log.info("emitter done"));
        emitter.onTimeout(()-> log.info("timeout happenned for emitter"));
        emitter.onError((ex)-> log.error("emitter got error, ", ex));

        executor.execute(() ->{
            try{
                BidRequest currRequest = bidService.getLastBid(auctionID);
                BidRequest lastRequest = new BidRequest();

                for(int i=0;currRequest != null;i++){
                    SseEventBuilder event = SseEmitter.event().data(currRequest).id(String.valueOf(i));
                    if(i == 0){
                        emitter.send(event);
                    }
                    else if(currRequest.isEqual(lastRequest) == false){ //bid updated
                        emitter.send(event);
                    }
                    /// get the updated value for bid
                    lastRequest = currRequest;
                    currRequest =  bidService.getLastBid(auctionID);
                    Thread.sleep(500);
                }
            }
            catch(Exception ex){
                emitter.completeWithError(ex);
            }

        });
        
        return emitter;
    }
    

    @PostMapping("/placebid")
    public ResponseEntity<BidRequest> postMethodName(@RequestBody BidRequest bid) {
        log.info("Placing a bid of $" + bid.getBidPrice());
        try {
            bidService.placeBid(bid);
            return new ResponseEntity<BidRequest>(HttpStatus.OK);
        } catch (Exception ex) {
            log.error("Could place the Bid for userID:" + bid.getBidderID(), ex);
            return new ResponseEntity<BidRequest>(HttpStatus.BAD_REQUEST);
        }

    }

}
