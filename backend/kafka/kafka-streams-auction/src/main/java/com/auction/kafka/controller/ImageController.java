package com.auction.kafka.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.auction.kafka.domain.Image;
import com.auction.kafka.repository.ImageRepository;
import com.auction.kafka.util.ImageUtility;

import lombok.extern.slf4j.Slf4j;

// @Service
@RestController
@RequestMapping(value = "/auction")
@Slf4j
// @CrossOrigin(origins = "http://localhost:8082") open for specific port
@CrossOrigin() // open for all ports
public class ImageController {
        @Autowired(required = false)
        ImageRepository imageRepository;
        AuctionController auctionController;

        // @Autowired
        // public ImageController(ImageRepository imageRepository) {
        // Assert.notNull(repository, "Repository must not be null!");
        // this.imageRepository = imageRepository;
        // }

        @PostMapping("/upload/image")
        public ResponseEntity<ImageUploadResponse> uploadImage(@RequestParam("image") MultipartFile file/*
                                                                                                         * ,@
                                                                                                         * RequestParam(
                                                                                                         * "auction")
                                                                                                         * auctionID
                                                                                                         */)
                        throws IOException {
                log.info("upload image---Controller");
                log.info("image original file");
                log.info(file.getOriginalFilename());

                log.info("image type file");
                log.info(file.getContentType());

                log.info("file content");
                // Auction auction=auctionController.getAuctionByID(auctionID);
                // log.info( imageRepository.save(Image.builder()
                // .image(ImageUtility.compressImage(file.getBytes())).build()));
                Image newImg = Image.builder()
                                .name(file.getOriginalFilename())
                                .type(file.getContentType())
                                .image(ImageUtility.compressImage(file.getBytes()))
                                // .auction(auction)
                                .build();

                imageRepository.save(newImg);
                return ResponseEntity.status(HttpStatus.OK)
                                .body(new ImageUploadResponse("Image uploaded successfully: " +
                                                file.getOriginalFilename()));
        }

}
