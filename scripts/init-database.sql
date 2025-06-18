-- Create database and tables for vehicle booking system

CREATE DATABASE IF NOT EXISTS db_nfc_booking;
USE db_nfc_booking;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('User', 'Approver', 'Driver', 'Admin') DEFAULT 'User',
    department VARCHAR(100),
    profile_photo VARCHAR(500),
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    registration VARCHAR(50) UNIQUE NOT NULL,
    capacity INT NOT NULL,
    status ENUM('Available', 'In Use', 'Maintenance', 'Inactive') DEFAULT 'Available',
    images JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    date_from DATETIME NOT NULL,
    date_to DATETIME NOT NULL,
    purpose TEXT NOT NULL,
    passengers INT NOT NULL,
    phone VARCHAR(20),
    status ENUM('Pending', 'Approved', 'Rejected', 'Completed') DEFAULT 'Pending',
    approver_id INT,
    approver_comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    FOREIGN KEY (approver_id) REFERENCES users(id)
);

-- Drivers table
CREATE TABLE IF NOT EXISTS drivers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    license_number VARCHAR(50) NOT NULL,
    license_photo VARCHAR(500),
    license_expiry DATE NOT NULL,
    license_type VARCHAR(50),
    total_trips INT DEFAULT 0,
    total_distance DECIMAL(10,2) DEFAULT 0,
    evaluation_score DECIMAL(3,2) DEFAULT 0,
    violations JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Photos table
CREATE TABLE IF NOT EXISTS photos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('license', 'issue', 'condition', 'vehicle', 'profile') NOT NULL,
    url VARCHAR(500) NOT NULL,
    related_id INT NOT NULL,
    tags VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Issues table
CREATE TABLE IF NOT EXISTS issues (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT,
    vehicle_id INT NOT NULL,
    user_id INT NOT NULL,
    description TEXT NOT NULL,
    image_urls JSON,
    status ENUM('Open', 'In Progress', 'Resolved') DEFAULT 'Open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert default admin user
INSERT INTO users (name, email, password, role, department) VALUES 
('Admin User', 'admin@company.com', '$2b$10$rQZ9QmjlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIe', 'Admin', 'IT'),
('John Approver', 'approver@company.com', '$2b$10$rQZ9QmjlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIe', 'Approver', 'Management'),
('Jane Driver', 'driver@company.com', '$2b$10$rQZ9QmjlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIe', 'Driver', 'Operations'),
('Bob User', 'user@company.com', '$2b$10$rQZ9QmjlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIe', 'User', 'Sales');

-- Insert sample vehicles
INSERT INTO vehicles (name, registration, capacity, images) VALUES 
('Toyota Hiace', 'ABC-1234', 12, '["https://example.com/hiace1.jpg", "https://example.com/hiace2.jpg"]'),
('Honda City', 'XYZ-5678', 4, '["https://example.com/city1.jpg", "https://example.com/city2.jpg"]'),
('Mitsubishi L300', 'DEF-9012', 8, '["https://example.com/l300_1.jpg", "https://example.com/l300_2.jpg"]');

-- Insert sample driver
INSERT INTO drivers (user_id, license_number, license_expiry, license_type, total_trips, total_distance, evaluation_score) VALUES 
(3, 'DL-123456789', '2025-12-31', 'Professional', 150, 25000.50, 4.8);
