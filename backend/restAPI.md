# REST API 

By default, the springboot app runs on 'localhost:8080'

## User API

### Create User

 ```
Method: POST
uri - localhost:8080/user/createuser
Sample Body:
{"userName":"Jidan", "email":"jidan1@gmail.com", "userPassword":"4300"}

```

### User Login
```
Method: POST
uri - localhost:8080/user/login
Sample Body:
{"email":"jidan1@gmail.com", "userPassword":"4300"}
```

### Get User
```
Method: GET
uri - localhost:8080/user/get/{userID}
Sample request: localhost:8080/user/get/1
```

### Get all Users
```
Method: GET
uri - localhost:8080/user/all
```

## Auction API

### Create Auction
```
Method: POST
uri - localhost:8080/auction/createauction
Sample Body:
{"sellerID":1, "auctionTitle":"SELLING car", "initialPrice":400}

```

### Get Auction
```
Method: GET
uri - localhost:8080/auction/get/{auctionID}
Sample request: localhost:8080/auction/get/1
```

### Get all Auction
```
Method: GET
uri - localhost:8080/auction/all
```

## Bid API

### Place bid
```
Method: POST
uri - localhost:8080/bid/placebid
Sample Body:
{"bidderID":1, "auctionID":1, "bidPrice":333}

```

### Get Bid
```
Method: GET
uri - localhost:8080/bid/getbid/{auctionID}
Sample request: localhost:8080/bid/getbid/1
```