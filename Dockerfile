FROM maven:3.8.4-openjdk-17 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline

COPY src src
RUN mvn -DskipTests clean package

FROM openjdk:17-alpine
WORKDIR /app
COPY --from=builder /app/target/carental-0.0.1-SNAPSHOT.jar .
COPY src/main/resources/application.properties /app/application.properties
CMD ["java", "-jar", "carental-0.0.1-SNAPSHOT.jar", "--spring.config.location=file:/app/application.properties"]
