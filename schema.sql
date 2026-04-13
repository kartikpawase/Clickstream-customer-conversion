CREATE DATABASE IF NOT EXISTS clickstream_db;
USE clickstream_db;

CREATE TABLE IF NOT EXISTS users_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(100),
    country VARCHAR(50),
    category VARCHAR(50),      /* Retaining for backward compat */
    product VARCHAR(100),      /* New Field */
    price FLOAT,
    clicks INT,
    duration INT,              /* New Field: Session duration in seconds */
    prediction INT,
    revenue FLOAT,
    cluster INT,               /* New Field */
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    api_used VARCHAR(100),
    request_data TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
