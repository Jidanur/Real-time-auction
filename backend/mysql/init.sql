CREATE TABLE user_table (
	    userID INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
	    userPassword VARCHAR(255),
	    userName VARCHAR(255),
	    email VARCHAR(255)
);

CREATE TABLE auction_table (
    auctionID INTEGER AUTO_INCREMENT PRIMARY KEY,
	sellerID INTEGER NOT NULL,
	winnerID INTEGER DEFAULT 0,
    auction_title VARCHAR(200),
    auction_description TEXT,
    imageName VARCHAR(200),
    lastBid VARCHAR(200),
	numOfBids INTEGER DEFAULT 0,
    initial_price INTEGER,
    current_bid INTEGER DEFAULT 0,
    final_price INTEGER DEFAULT -1,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP,
    FOREIGN KEY (sellerID) REFERENCES user_table(userID)
);

CREATE TABLE image_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(1000),
    type VARCHAR(1000),
    image LONGBLOB NOT NULL,
    auctionID INTEGER NOT NULL,
    FOREIGN KEY (auctionID) REFERENCES auction_table(auctionID)

);