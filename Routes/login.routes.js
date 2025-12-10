// Import express module
const express = require('express');

const router = express.Router();

const loginController = require('../Controllers/login.controller');

router.post("/api/admin/login", loginController.logIn)

// export the router
module.exports = router;