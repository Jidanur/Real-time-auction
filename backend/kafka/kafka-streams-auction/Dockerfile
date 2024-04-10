FROM maven:3.8.4-openjdk-17-slim as build
COPY . /app
WORKDIR /app
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk-alpine
COPY --from=build /app/target/kafka-streams-auction.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar","--spring.config.location=classpath:/application_docker.properties"]
