-- MySQL Schema for Arcade: Smart Xerox Management System
-- Rajalakshmi Institute of Technology (RIT)

CREATE DATABASE IF NOT EXISTS arcade_xerox;
USE arcade_xerox;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('STUDENT', 'FACULTY', 'ADMIN') DEFAULT 'STUDENT',
    student_id VARCHAR(50),
    department VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Print Orders Table
CREATE TABLE IF NOT EXISTS print_orders (
    id VARCHAR(50) PRIMARY KEY, -- e.g. ARC202600123
    token_number VARCHAR(20) NOT NULL, -- e.g. A-105
    user_id VARCHAR(50) NOT NULL,
    user_name VARCHAR(150) NOT NULL,
    user_email VARCHAR(150) NOT NULL,
    user_mobile VARCHAR(20) NOT NULL,
    total_pages INT NOT NULL,
    print_type ENUM('BW', 'COLOR') NOT NULL DEFAULT 'BW',
    paper_size ENUM('A4', 'A3') NOT NULL DEFAULT 'A4',
    sides ENUM('SINGLE', 'DOUBLE') NOT NULL DEFAULT 'SINGLE',
    copies INT NOT NULL DEFAULT 1,
    binding ENUM('NONE', 'STAPLE', 'SPIRAL') DEFAULT 'NONE',
    lamination BOOLEAN DEFAULT FALSE,
    special_instructions TEXT,
    printing_cost DECIMAL(10,2) NOT NULL,
    binding_cost DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    lamination_cost DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    gst_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('GOOGLE_PAY', 'PHONEPE', 'PAYTM') NOT NULL,
    payment_id VARCHAR(100) NOT NULL,
    payment_status ENUM('PENDING', 'VERIFIED', 'FAILED') DEFAULT 'VERIFIED',
    order_status ENUM(
        'ORDER_RECEIVED',
        'PAYMENT_VERIFIED',
        'PRINTING_STARTED',
        'PRINTING_COMPLETED',
        'READY_FOR_PICKUP',
        'COMPLETED',
        'CANCELLED'
    ) DEFAULT 'ORDER_RECEIVED',
    estimated_pickup_time VARCHAR(50),
    is_reprint BOOLEAN DEFAULT FALSE,
    original_order_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Uploaded Order Documents Table
CREATE TABLE IF NOT EXISTS order_documents (
    id VARCHAR(50) PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    page_count INT NOT NULL DEFAULT 1,
    file_storage_path VARCHAR(500) NOT NULL,
    copies INT NOT NULL DEFAULT 1,
    item_total DECIMAL(10,2) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES print_orders(id) ON DELETE CASCADE
);

-- 4. Order Status Timeline Audit Table
CREATE TABLE IF NOT EXISTS order_status_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    changed_by VARCHAR(50) NOT NULL,
    notes VARCHAR(255),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES print_orders(id) ON DELETE CASCADE
);

-- 5. Reprint Requests Table
CREATE TABLE IF NOT EXISTS reprint_requests (
    id VARCHAR(50) PRIMARY KEY,
    original_order_id VARCHAR(50) NOT NULL,
    new_order_id VARCHAR(50),
    user_id VARCHAR(50) NOT NULL,
    copies INT NOT NULL,
    status ENUM('PENDING', 'APPROVED', 'PROCESSED') DEFAULT 'APPROVED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (original_order_id) REFERENCES print_orders(id)
);

-- Initial Admin Seed
INSERT INTO users (id, name, email, mobile, password_hash, role, department)
VALUES (
    'usr_admin_rit',
    'RIT Xerox Center Admin',
    'admin@rit.ac.in',
    '+91 94440 99887',
    '$2a$10$w0B0.9Z5n2XkI5N6hK64o.q38z7H4f2uXG7n/w.iR9D9o2L9EwE0G', -- bcrypt: admin123
    'ADMIN',
    'Campus Reprographics & Digital Printing Dept'
) ON DUPLICATE KEY UPDATE name=name;
