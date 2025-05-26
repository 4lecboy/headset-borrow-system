-- Create database (if not exists)
CREATE DATABASE IF NOT EXISTS headset_borrow_system;

-- Use the database
USE headset_borrow_system;

-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(100) NOT NULL UNIQUE,
  employee_id VARCHAR(50) NOT NULL UNIQUE COMMENT 'Ashima ID',
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add an initial admin user with password 'password'
-- Password is hashed using bcrypt
INSERT INTO admin_users (name, username, employee_id, password) 
VALUES (
  'John Doe', 
  'johndoe', 
  '25-12345', 
  '$2b$10$RRepks4Qy.J/2tl2725ytOtIVoBC8t3UqyXyaok97r4X0rCvCdLxa'
);