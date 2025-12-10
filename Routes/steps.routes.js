// import express module
const express = require('express')

const router = express.Router();

// Import step controller
const stepController = require('../Controllers/steps.controller')
// create route to handle set steps request on post
router.post('/api/admin/steps', stepController.setSteps);
// create route to handle get all steps request on get
router.get('/api/admin/steps', stepController.getSteps);
// Create route to handle to get a single step request on get
router.get('/api/admin/step/:step_id', stepController.getSingleStep)
// create a route to handle get steps for a single roadmap
router.get("/api/admin/steps/:roadmap_id", stepController.getStepsByRoadmap);
// create route to handle delete steps request on delete
router.delete('/api/admin/steps/:step_id', stepController.deleteSteps);
// create route to handle update steps request on put
router.put('/api/admin/steps/edit/:step_id', stepController.updateSteps)

module.exports = router;