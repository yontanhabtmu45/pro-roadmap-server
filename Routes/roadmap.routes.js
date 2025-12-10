// import express module
const express = require('express')

const router = express.Router();

// import roadmap controller
const roadmapController = require('../Controllers/roadmap.controller')

// create route to handle add roadmap request on post
router.post('/api/admin/roadmap', roadmapController.createRoadmap);
// create route to handle get all roadmaps request on get
router.get('/api/admin/roadmaps' ,roadmapController.getAllRoadmaps)
// create route to handle get roadmap request on get
router.get('/api/admin/roadmap/:roadmap_id', roadmapController.getRoadmap)
// create route to handle delete roadmap request on delete
router.delete('/api/admin/roadmap/:roadmap_id', roadmapController.deleteRoadmap);
// create route to handle update roadmap request on put
router.put('/api/admin/roadmap/edit/:roadmap_id', roadmapController.updateRoadmap);

module.exports = router;