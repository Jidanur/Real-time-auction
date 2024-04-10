package com.auction.kafka.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.auction.kafka.domain.Image;
import com.auction.kafka.domain.Response;
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
        @Autowired // (required = false)
        ImageRepository imageRepository;

        @PostMapping("/upload-images")
        public ResponseEntity<Response> uploadImage(@RequestParam("images") List<MultipartFile> files,
                        @RequestParam("auctionID") int auctionID)
                        throws IOException {

                try {
                        for (MultipartFile file : files) {
                                Image newImg = Image.builder()
                                                .name(file.getOriginalFilename())
                                                .type(file.getContentType())
                                                .image(ImageUtility.compressImage(file.getBytes()))
                                                .auctionID(auctionID)
                                                .build();

                                imageRepository.save(newImg);
                        }

                        return ResponseEntity.status(HttpStatus.OK)
                                        .body(new Response("Images uploaded successfully"));
                } catch (Exception e) {
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                        .body(new Response("Error uploading images: " + e.getMessage()));
                }
        }

        @GetMapping(path = "/get-images/{auctionID}")
        public ResponseEntity<List<byte[]>> getImagesByAuctionID(@PathVariable("auctionID") int auctionID)
                        throws IOException {
                List<byte[]> compressedImages = imageRepository.findImageBytesByAuctionID(auctionID);

                if (compressedImages.isEmpty()) {
                        return ResponseEntity.notFound().build();
                }
                log.info("Images retrived");

                List<byte[]> decompressedImages = compressedImages.stream()
                                .map(compressedImage -> {
                                        try {
                                                return ImageUtility.decompressImage(compressedImage);
                                        } catch (Exception e) {
                                                // Handle the exception
                                                e.printStackTrace();
                                                return null;
                                        }
                                })
                                .toList(); // Requires Java 16 or above, for Java 8 use .collect(Collectors.toList())

                log.info("Image fetched");
                // return null;
                return ResponseEntity
                                .ok()
                                .body(decompressedImages);
        }

}