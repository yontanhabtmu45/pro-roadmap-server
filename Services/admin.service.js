// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module
const bcrypt = require("bcrypt");
// A function to check if admin exists in the database
async function checkIfAdminExists(email) {
  const query = "SELECT * FROM admin_users WHERE admin_email = ? ";
  const rows = await conn.executeQuery(query, [email]);
  // console.log(rows);
  if (rows.length > 0) {
    return true;
  }
  return false;
}
// A function to create a new admin
async function createAdmin(adminData) {
  const { admin_name, admin_email, admin_password } = adminData;
    // Check if admin already exists
    const adminExists = await checkIfAdminExists(admin_email);
    if (adminExists) {
      throw new Error("Admin with this email already exists");
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(admin_password, 10);
    // Insert the new admin into the database
    const query =
      "INSERT INTO admin_users (admin_name, admin_email, admin_password_hash) VALUES (?, ?, ?)";
    const result = await conn.executeQuery(query, [
      admin_name,
      admin_email,
      hashedPassword,
    ]);
    return result;
}

// A function to get all admins 
async function getAllAdmins() {
    const query = "SELECT * FROM admin_users ORDER BY created_at DESC";
    const data = await conn.executeQuery(query)
    return data;
}

// A function to get admin by email
async function getAdminByEmail(admin_email) {
    const query = "SELECT * FROM admin_users WHERE admin_email = ? ";
    const rows = await conn.executeQuery(query, [admin_email]);
    return rows;
}

// A function to delete admin by id
async function deleteAdmin(admin_id) {
  const query = "DELETE FROM admin_users WHERE admin_id = ? ";
  const result = await conn.executeQuery(query, [admin_id]);
  return result;
}

// A function to update admin details
async function updateAdmin(admin_id, updateData) {
  const { admin_email, admin_name, admin_password } = updateData;

  let updateFields = [];
  let params = [];

  if (admin_email) {
    updateFields.push("admin_email = ?");
    params.push(admin_email);
  }

  if (admin_name) {
    updateFields.push("admin_name = ?");
    params.push(admin_name);
  }

  // Only hash password if provided
  if (admin_password && admin_password.trim() !== "") {
    const hashedPassword = await bcrypt.hash(admin_password, 10);
    updateFields.push("admin_password_hash = ?");
    params.push(hashedPassword);
  }

  if (updateFields.length === 0) {
    throw new Error("No valid fields provided for update");
  }

  const query = `
    UPDATE admin_users 
    SET ${updateFields.join(", ")}
    WHERE admin_id = ?
  `;

  params.push(admin_id);

  return await conn.executeQuery(query, params);
}

// Export the functions
module.exports = {
  createAdmin,
  checkIfAdminExists,
  getAllAdmins,
  getAdminByEmail,
  deleteAdmin,
  updateAdmin
};