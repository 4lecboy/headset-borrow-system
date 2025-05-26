const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'headset_borrow_system',
};

async function createUser(name, username, employeeId, password) {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a database connection
    const connection = await mysql.createConnection(dbConfig);
    
    // Insert the user
    const [result] = await connection.execute(
      'INSERT INTO admin_users (name, username, employee_id, password) VALUES (?, ?, ?, ?)',
      [name, username, employeeId, hashedPassword]
    );
    
    await connection.end();
    
    console.log(`User created successfully! User ID: ${result.insertId}`);
    console.log('Hashed password:', hashedPassword);
    
    return result.insertId;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Example usage:
// Run this script with Node.js to create a new user
// node scripts/create-user.js
async function main() {
  try {
    const userId = await createUser(
      'Admin User',           // name
      'admin',                // username
      'ASH654321',            // employee ID
      'admin123'              // password (will be hashed)
    );
    
    console.log('Created user with ID:', userId);
  } catch (error) {
    console.error('Failed to create user:', error);
  }
}

main();