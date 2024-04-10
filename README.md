# Real-time-auction
Welcome to our Real-Time Auction Web App, a dynamic platform that brings auctions to life with real-time updates and seamless user experience. Built on a robust microservices architecture using Kafka and Spring Boot, coupled with cache integration for optimized performance, our application ensures smooth and scalable auctioning experiences.

# Functionality

# Building and Running the project
Getting started with this project is a breeze, thanks to its Docker-based setup. Follow these simple steps to kick off this app:

1. **Install Docker:**
   Ensure Docker is installed on your system. You can download and install Docker from the [official website](https://www.docker.com/get-started).

2. **Build Docker Images:**
   Execute the provided bash script to build the Docker images for frontend & backend app. If you're on a Linux machine or using Windows Subsystem for Linux (WSL), simply run the script to initiate the process.
```./build_docker_images.sh```

3. ***Start the containers***   
    ```docker-compose up```
    Ensure Docker is running in the background. This command will download the required images for services such as Zookeeper, Kafka, and MySQL. The Spring app may take a few attempts to start as the database and Kafka services need time to initialize. After a few retries, you'll see log messages indicating the backend Spring app is running successfully.

4.  ***Access the backend***
    By default, the Spring backend runs on `localhost:8080` You can test the backend functionality by accessing this URL in your web browser or using API testing tools.


## Testing environment
- Ubuntu

# Architecture
    ![Real-Time Auction Architecture](architecture.png)