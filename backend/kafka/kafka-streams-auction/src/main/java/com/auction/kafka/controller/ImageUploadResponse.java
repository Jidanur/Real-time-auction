package com.auction.kafka.controller;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageUploadResponse {
    private String message;

    public ImageUploadResponse(String message) {
        this.message = message;
    }

}
