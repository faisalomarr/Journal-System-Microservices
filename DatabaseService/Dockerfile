# Use the official MySQL image as the base
FROM mysql:latest

# Set MySQL root credentials and database name as environment variables
ENV MYSQL_ROOT_PASSWORD=Afcsaka1!kth2
ENV MYSQL_DATABASE=microservicestestKubernetes

# Copy the dump file into the MySQL initialization directory
COPY dump.sql /docker-entrypoint-initdb.d/

# Expose the MySQL default port
EXPOSE 3306

