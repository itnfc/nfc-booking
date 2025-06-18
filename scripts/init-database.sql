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

-- Add more comprehensive mock data

-- Insert more users with different roles
INSERT INTO users (name, email, password, role, department, profile_photo, status) VALUES 
('Admin User', 'admin@company.com', '$2b$10$rQZ9QmjlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIe', 'Admin', 'IT', '/placeholder.svg?height=100&width=100', 'Active'),
('John Approver', 'approver@company.com', '$2b$10$rQZ9QmjlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIe', 'Approver', 'Management', '/placeholder.svg?height=100&width=100', 'Active'),
('Jane Driver', 'driver@company.com', '$2b$10$rQZ9QmjlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIe', 'Driver', 'Operations', '/placeholder.svg?height=100&width=100', 'Active'),
('Bob User', 'user@company.com', '$2b$10$rQZ9QmjlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIe', 'User', 'Sales', '/placeholder.svg?height=100&width=100', 'Active'),
('Sarah Johnson', 'sarah.johnson@company.com', '$2b$10$rQZ9QmjlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIe', 'User', 'Marketing', '/placeholder.svg?height=100&width=100', 'Active'),
('Mike Wilson', 'mike.wilson@company.com', '$2b$10$rQZ9QmjlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIe', 'User', 'Operations', '/placeholder.svg?height=100&width=100', 'Active'),
('Lisa Chen', 'lisa.chen@company.com', '$2b$10$rQZ9QmjlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIe', 'Approver', 'Finance', '/placeholder.svg?height=100&width=100', 'Active'),
('David Rodriguez', 'david.rodriguez@company.com', '$2b$10$rQZ9QmjlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIe', 'Driver', 'Operations', '/placeholder.svg?height=100&width=100', 'Active'),
('Emily Davis', 'emily.davis@company.com', '$2b$10$rQZ9QmjlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIe', 'User', 'HR', '/placeholder.svg?height=100&width=100', 'Active'),
('Tom Anderson', 'tom.anderson@company.com', '$2b$10$rQZ9QmjlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIe', 'User', 'Sales', '/placeholder.svg?height=100&width=100', 'Active'),
('Rachel Green', 'rachel.green@company.com', '$2b$10$rQZ9QmjlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIe', 'User', 'Marketing', '/placeholder.svg?height=100&width=100', 'Active'),
('James Brown', 'james.brown@company.com', '$2b$10$rQZ9QmjlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIe', 'Driver', 'Operations', '/placeholder.svg?height=100&width=100', 'Active'),
('Anna Martinez', 'anna.martinez@company.com', '$2b$10$rQZ9QmjlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIe', 'User', 'Finance', '/placeholder.svg?height=100&width=100', 'Active'),
('Kevin Lee', 'kevin.lee@company.com', '$2b$10$rQZ9QmjlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIe', 'User', 'IT', '/placeholder.svg?height=100&width=100', 'Active'),
('Maria Garcia', 'maria.garcia@company.com', '$2b$10$rQZ9QmjlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIeAJlxwHIe', 'User', 'HR', '/placeholder.svg?height=100&width=100', 'Active');

-- Insert more vehicles with detailed information
INSERT INTO vehicles (name, registration, capacity, status, images) VALUES 
('Toyota Hiace', 'ABC-1234', 12, 'Available', '["https://example.com/hiace1.jpg", "https://example.com/hiace2.jpg", "https://example.com/hiace_interior.jpg"]'),
('Honda City', 'XYZ-5678', 4, 'In Use', '["https://example.com/city1.jpg", "https://example.com/city2.jpg", "https://example.com/city_interior.jpg"]'),
('Mitsubishi L300', 'DEF-9012', 8, 'Maintenance', '["https://example.com/l300_1.jpg", "https://example.com/l300_2.jpg", "https://example.com/l300_interior.jpg"]'),
('Toyota Innova', 'GHI-3456', 7, 'Available', '["https://example.com/innova1.jpg", "https://example.com/innova2.jpg", "https://example.com/innova_interior.jpg"]'),
('Nissan Urvan', 'JKL-7890', 15, 'Available', '["https://example.com/urvan1.jpg", "https://example.com/urvan2.jpg", "https://example.com/urvan_interior.jpg"]'),
('Honda CR-V', 'MNO-2468', 5, 'In Use', '["https://example.com/crv1.jpg", "https://example.com/crv2.jpg", "https://example.com/crv_interior.jpg"]'),
('Toyota Vios', 'PQR-1357', 4, 'Available', '["https://example.com/vios1.jpg", "https://example.com/vios2.jpg", "https://example.com/vios_interior.jpg"]'),
('Isuzu D-Max', 'STU-9753', 5, 'Available', '["https://example.com/dmax1.jpg", "https://example.com/dmax2.jpg", "https://example.com/dmax_interior.jpg"]'),
('Ford Transit', 'VWX-8642', 14, 'Maintenance', '["https://example.com/transit1.jpg", "https://example.com/transit2.jpg", "https://example.com/transit_interior.jpg"]'),
('Hyundai Accent', 'YZA-5319', 4, 'Available', '["https://example.com/accent1.jpg", "https://example.com/accent2.jpg", "https://example.com/accent_interior.jpg"]');

-- Insert comprehensive booking data
INSERT INTO bookings (user_id, vehicle_id, date_from, date_to, purpose, passengers, phone, status, approver_id, approver_comment) VALUES 
(4, 1, '2024-01-20 09:00:00', '2024-01-20 17:00:00', 'Client presentation and site visit to showcase our new products', 8, '+1234567890', 'Pending', NULL, NULL),
(5, 2, '2024-01-22 14:00:00', '2024-01-22 18:00:00', 'Meeting with advertising agency for new campaign', 2, '+1234567891', 'Pending', NULL, NULL),
(6, 3, '2024-01-25 08:00:00', '2024-01-25 16:00:00', 'Equipment delivery to branch office', 4, '+1234567892', 'Approved', 2, 'Approved for operational needs'),
(9, 4, '2024-01-18 10:00:00', '2024-01-18 15:00:00', 'HR team building activity', 6, '+1234567893', 'Approved', 7, 'Team building approved'),
(10, 5, '2024-01-19 07:00:00', '2024-01-19 19:00:00', 'Sales team client visits', 12, '+1234567894', 'Pending', NULL, NULL),
(11, 6, '2024-01-21 13:00:00', '2024-01-21 17:00:00', 'Marketing campaign shoot', 3, '+1234567895', 'Rejected', 2, 'Vehicle not suitable for this purpose'),
(13, 7, '2024-01-23 09:00:00', '2024-01-23 12:00:00', 'Finance audit meeting', 2, '+1234567896', 'Approved', 7, 'Business critical meeting approved'),
(14, 8, '2024-01-24 08:00:00', '2024-01-24 18:00:00', 'IT equipment transport', 3, '+1234567897', 'Pending', NULL, NULL),
(15, 10, '2024-01-26 11:00:00', '2024-01-26 16:00:00', 'HR recruitment interviews', 2, '+1234567898', 'Approved', 2, 'Recruitment activities approved'),
(4, 1, '2024-01-15 08:00:00', '2024-01-15 17:00:00', 'Sales presentation to major client', 10, '+1234567890', 'Completed', 2, 'Successfully completed'),
(5, 2, '2024-01-12 14:00:00', '2024-01-12 18:00:00', 'Marketing research field work', 3, '+1234567891', 'Completed', 7, 'Research completed successfully'),
(6, 4, '2024-01-10 09:00:00', '2024-01-10 15:00:00', 'Operations site inspection', 5, '+1234567892', 'Completed', 2, 'Inspection completed'),
(10, 7, '2024-01-08 10:00:00', '2024-01-08 14:00:00', 'Sales team meeting', 3, '+1234567894', 'Completed', 7, 'Meeting successful'),
(11, 5, '2024-01-05 08:00:00', '2024-01-05 18:00:00', 'Marketing event setup', 8, '+1234567895', 'Completed', 2, 'Event setup completed'),
(13, 10, '2024-01-03 13:00:00', '2024-01-03 17:00:00', 'Finance department outing', 4, '+1234567896', 'Completed', 7, 'Department activity completed');

-- Insert driver profiles
INSERT INTO drivers (user_id, license_number, license_photo, license_expiry, license_type, total_trips, total_distance, evaluation_score, violations) VALUES 
(3, 'DL-123456789', '/placeholder.svg?height=200&width=300', '2025-12-31', 'Professional', 150, 25000.50, 4.8, '[]'),
(8, 'DL-987654321', '/placeholder.svg?height=200&width=300', '2024-08-15', 'Standard', 89, 15600.30, 4.2, '["Speeding - Minor"]'),
(12, 'DL-456789123', '/placeholder.svg?height=200&width=300', '2025-06-30', 'Professional', 203, 35200.75, 4.9, '[]'),
(3, 'DL-789123456', '/placeholder.svg?height=200&width=300', '2024-11-20', 'Standard', 67, 12800.25, 3.8, '["Late arrival", "Vehicle damage - Minor"]');

-- Insert photos for various purposes
INSERT INTO photos (type, url, related_id, tags) VALUES 
('license', '/placeholder.svg?height=200&width=300', 3, 'professional,driver,license'),
('license', '/placeholder.svg?height=200&width=300', 8, 'standard,driver,license'),
('license', '/placeholder.svg?height=200&width=300', 12, 'professional,driver,license'),
('vehicle', '/placeholder.svg?height=200&width=300', 1, 'exterior,front,toyota'),
('vehicle', '/placeholder.svg?height=200&width=300', 1, 'interior,seats,toyota'),
('vehicle', '/placeholder.svg?height=200&width=300', 2, 'exterior,side,honda'),
('vehicle', '/placeholder.svg?height=200&width=300', 2, 'interior,dashboard,honda'),
('vehicle', '/placeholder.svg?height=200&width=300', 3, 'exterior,rear,mitsubishi'),
('condition', '/placeholder.svg?height=200&width=300', 1, 'before,trip,condition'),
('condition', '/placeholder.svg?height=200&width=300', 1, 'after,trip,condition'),
('condition', '/placeholder.svg?height=200&width=300', 2, 'before,trip,condition'),
('condition', '/placeholder.svg?height=200&width=300', 2, 'after,trip,condition'),
('issue', '/placeholder.svg?height=200&width=300', 1, 'damage,scratch,minor'),
('issue', '/placeholder.svg?height=200&width=300', 2, 'engine,problem,major'),
('issue', '/placeholder.svg?height=200&width=300', 3, 'brake,safety,critical');

-- Insert comprehensive issues data
INSERT INTO issues (booking_id, vehicle_id, user_id, description, image_urls, status) VALUES 
(1, 1, 4, 'Air conditioning not working properly. Blowing warm air instead of cold.', '["https://example.com/issue1_1.jpg", "https://example.com/issue1_2.jpg"]', 'Open'),
(2, 2, 5, 'Strange noise coming from the engine when accelerating. Sounds like grinding.', '["https://example.com/issue2_1.jpg"]', 'In Progress'),
(3, 3, 6, 'Brake pedal feels spongy and requires more pressure than usual.', '["https://example.com/issue3_1.jpg"]', 'Resolved'),
(NULL, 1, 1, 'Minor scratch on the rear bumper. Cosmetic damage only.', '["https://example.com/issue4_1.jpg"]', 'Open'),
(4, 4, 9, 'Windshield wiper not working on passenger side', '["https://example.com/issue5_1.jpg"]', 'Open'),
(5, 5, 10, 'Seat belt in second row is stuck and won\'t retract', '["https://example.com/issue6_1.jpg", "https://example.com/issue6_2.jpg"]', 'In Progress'),
(NULL, 6, 11, 'Dashboard warning light for engine check is on', '["https://example.com/issue7_1.jpg"]', 'Open'),
(7, 7, 13, 'Radio system not responding to controls', '["https://example.com/issue8_1.jpg"]', 'Resolved'),
(NULL, 8, 14, 'Tire pressure seems low on front right tire', '["https://example.com/issue9_1.jpg"]', 'Open'),
(9, 10, 15, 'Door handle on driver side is loose', '["https://example.com/issue10_1.jpg"]', 'In Progress'),
(NULL, 2, 5, 'Fuel gauge showing incorrect reading', '["https://example.com/issue11_1.jpg"]', 'Open'),
(NULL, 3, 6, 'Headlight bulb burned out on left side', '["https://example.com/issue12_1.jpg"]', 'Resolved'),
(NULL, 4, 9, 'USB charging port not working in back seat', '["https://example.com/issue13_1.jpg"]', 'Open'),
(NULL, 5, 10, 'Mirror adjustment button not functioning', '["https://example.com/issue14_1.jpg"]', 'In Progress'),
(NULL, 1, 4, 'Floor mat is torn and needs replacement', '["https://example.com/issue15_1.jpg"]', 'Open');
