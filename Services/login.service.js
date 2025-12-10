// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module to do the password comparison
const bcrypt = require("bcrypt");
// Import admin service to get admin by email
const adminService = require("./admin.service");
// A function to login admin
async function loginAdmin(adminData) {
  try {
    let returnData = {};
    const admin = await adminService.getAdminByEmail(adminData.admin_email);
    if (!admin || admin.length === 0) {
      returnData = {
        status: "Fail",
        message: "Admin doesn't exist",
      };
      return returnData;
    }
    const passwordMatch = await bcrypt.compare(
      adminData.admin_password,
      admin[0].admin_password_hash
    );
    if (!passwordMatch) {
      returnData = {
        status: "Fail",
        message: "In correct Password",
      };
      return returnData;
    }
    returnData = {
      status: "success",
      data: admin[0],
    };
    return returnData;
  } catch (error) {
    console.log(error);
  }
}

// Export the function
module.exports = {
  loginAdmin,
};