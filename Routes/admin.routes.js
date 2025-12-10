// import express module
const express = require('express')

// import auth middleware
const authMiddleware = require('../Middlewares/auth.middleware');

const router = express.Router();

// import admin controller
const adminController = require('../Controllers/admin.controller')
// create route to handle add admin request on post
router.post('/api/admin', adminController.createAdmin);
// create route to handle get all admins request on get
router.get('/api/admins' , adminController.getAllAdmins)
// create route to handle get admin request on get
router.get('/api/admin/:admin_email', adminController.getAdmin);
// create route to handle delete admin request on delete
router.delete('/api/admin/:admin_id', adminController.deleteAdmin);
// create route to handle admin request on update
router.put('/api/admin/edit/:admin_id', adminController.updateAdmin)

module.exports = router;