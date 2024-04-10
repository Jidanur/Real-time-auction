#!/bin/bash

# Directory to backend app
cd backend/kafka/kafka-streams-auction || exit
docker build -t spring-auction-backend .
