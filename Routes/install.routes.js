// import express
const express = require('express');
// import router
const router = express.Router();

// import the install controller
const installController = require('../Controllers/install.controller');

// create a route for the install
router.get('/install', installController.install);

module.exports = router;