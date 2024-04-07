package com.auction.kafka.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Entity
@Table(name = "image_table")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor // (access = AccessLevel.PACKAGE)
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false, onlyExplicitlyIncluded = true)
public class Image {
    @Id
    // @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "image", unique = false, nullable = false, length = 100000)
    private byte[] image;

    // @ManyToOne
    // @JoinColumn(name = "auctionID", referencedColumnName = "auctionID")
    // private Auction auction;

}