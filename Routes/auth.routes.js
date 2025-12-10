// import express module
const express = require('express')

const router = express.Router();

// Import auth controller 
const authController = require ("../Controllers/auth.controller");

// create route to handle the google login
router.post("/google", authController.googleAuth);

// Export modules
module.exports = router;