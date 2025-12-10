// Import the login service 
const loginService = require('../Services/login.service');
// Import the jsonwebtoken module
const jwt = require("jsonwebtoken");
// Import the secret key from the environment variables
const jwtSecret = process.env.JWT_SECRET;

// handle admin login
async function logIn(req, res, next) {
    try {
        console.log(req.body);
        const adminData = req.body;

        const admin = await loginService.loginAdmin(adminData);

        // Check if login failed or data is missing
        if (!admin || admin.status === "Fail" || !admin.data) {
            const message = (admin && admin.message) || "Admin login failed";
            console.log(message);
            return res.status(403).json({
                status: "Fail",
                message: message,
            });
        }

        // If successful, send a response to the client
        const payload = {
            admin_id: admin.data.admin_id,
            admin_email: admin.data.admin_email,
            admin_name: admin.data.admin_name,
        };

        const token = jwt.sign(payload, jwtSecret, { expiresIn: "24h" });

        res.status(200).json({
            status: "success",
            message: "Admin logged in successfully",
            data: { admin_token: token },
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
}

// Export the functions 
module.exports = {
  logIn
};
