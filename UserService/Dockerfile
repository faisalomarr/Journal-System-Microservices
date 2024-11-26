# Use a base image with JDK
FROM openjdk:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the service's JAR file to the container
COPY target/UserService-1.0-SNAPSHOT.jar app.jar

# Expose the service's internal port
EXPOSE 8082

# Define the command to run the service
ENTRYPOINT ["java", "-jar", "app.jar"]
